package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.AppointmentDto;
import com.clinic.clinic.dto.BookAppointmentDto;
import com.clinic.clinic.email.EmailService;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.*;
import com.clinic.clinic.repository.*;
import com.clinic.clinic.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ReceptionistRepository receptionistRepository;

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private EmailService emailService;

    private Receptionist getReceptionistIfExists(Long receptionistId) {
        if (receptionistId == null) return null;
        return receptionistRepository.findById(receptionistId)
                .orElseThrow(() -> new ResourceNotFoundException("Receptionist not found with ID: " + receptionistId));
    }
    @Override
    public Appointment addAppointment(AppointmentDto appointmentDto) {
        Doctor doctor = doctorRepository.findById(appointmentDto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + appointmentDto.getDoctorId()));
        Patient patient = patientRepository.findById(appointmentDto.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + appointmentDto.getPatientId()));

        Receptionist receptionist = getReceptionistIfExists(appointmentDto.getReceptionistId());

        Appointment appointment = new Appointment();
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());
        appointment.setDateTime(appointmentDto.getDateTime());
        appointment.setReason(appointmentDto.getReason());
        appointment.setStatus("Confirmed");
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setReceptionist(receptionist);

        emailService.scheduleReminderEmail(patient.getEmail(), patient.getFirstName() + patient.getLastName(), appointment.getDateTime());

        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment updateAppointment(Long id, AppointmentDto appointmentDto) {
        Appointment existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found with ID: " + id));

        existingAppointment.setUpdatedAt(LocalDateTime.now());
        existingAppointment.setDateTime(appointmentDto.getDateTime());
        existingAppointment.setReason(appointmentDto.getReason());
        existingAppointment.setStatus(appointmentDto.getStatus());

        if (appointmentDto.getDoctorId() != null) {
            Doctor doctor = doctorRepository.findById(appointmentDto.getDoctorId())
                    .orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + appointmentDto.getDoctorId()));
            existingAppointment.setDoctor(doctor);
        }

        // Gọi phương thức gửi email nhắc nhở
        emailService.scheduleReminderEmail(existingAppointment.getPatient().getEmail(),
                existingAppointment.getPatient().getFirstName() +
                        existingAppointment.getPatient().getLastName(), existingAppointment.getDateTime());

        return appointmentRepository.save(existingAppointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public List<Appointment> getAllAppointment() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found with ID: " + id));
    }

    @Override
    public void bookAppointment(BookAppointmentDto bookAppointmentDto) {
        Specialty specialty = specialtyRepository.findByName(bookAppointmentDto.getSpecialtyName())
                .orElseThrow(() -> new ResourceNotFoundException("Specialty not found with name: " + bookAppointmentDto.getSpecialtyName()));

        Doctor doctor = doctorRepository.findByFirstNameAndLastNameAndSpecialty(
                bookAppointmentDto.getDoctorFirstName(),
                bookAppointmentDto.getDoctorLastName(),
                specialty
        ).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        String phone = bookAppointmentDto.getPatient().getPhone();
        if (patientRepository.existsByPhone(phone)) {
            throw new IllegalArgumentException("Phone number already exists: " + phone);
        }

        Patient patient = new Patient();
        patient.setFirstName(bookAppointmentDto.getPatient().getFirstName());
        patient.setLastName(bookAppointmentDto.getPatient().getLastName());
        patient.setEmail(bookAppointmentDto.getPatient().getEmail());
        patient.setGender(bookAppointmentDto.getPatient().getGender());
        patient.setPhone(phone);
        patient.setDateOfBirth(bookAppointmentDto.getPatient().getDateOfBirth());
        patient.setDoctor(doctor);
        patient.setRole(Role.PATIENT);

        Patient savedPatient = patientRepository.save(patient);

        Appointment appointment = new Appointment();
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());
        appointment.setDateTime(bookAppointmentDto.getDateTime());
        appointment.setReason(bookAppointmentDto.getReason());
        appointment.setStatus("Waiting");
        appointment.setDoctor(doctor);
        appointment.setPatient(savedPatient);

        Appointment savedAppointment = appointmentRepository.save(appointment);
        emailService.scheduleReminderEmail(savedPatient.getEmail(),
                savedPatient.getFirstName() + " " + savedPatient.getLastName(),
                savedAppointment.getDateTime());
    }
}
