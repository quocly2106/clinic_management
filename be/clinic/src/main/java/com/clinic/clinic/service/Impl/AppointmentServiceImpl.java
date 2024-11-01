package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.AppointmentDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.*;
import com.clinic.clinic.repository.DoctorRepository;
import com.clinic.clinic.repository.PatientRepository;
import com.clinic.clinic.repository.AppointmentRepository;
import com.clinic.clinic.repository.ReceptionistRepository;
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

    @Override
    public Appointment addAppointment(AppointmentDto appointmentDto) {
        Doctor doctor = doctorRepository.findById(appointmentDto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + appointmentDto.getDoctorId()));
        Patient patient = patientRepository.findById(appointmentDto.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + appointmentDto.getPatientId()));

        Receptionist receptionist = null;
        if (appointmentDto.getReceptionistId() != null) {
            receptionist = receptionistRepository.findById(appointmentDto.getReceptionistId())
                    .orElseThrow(() -> new ResourceNotFoundException("Receptionist not found with ID: " + appointmentDto.getReceptionistId()));
        }

        Appointment appointment = new Appointment();
        appointment.setCreatedAt(LocalDateTime.now()); // Sử dụng LocalDateTime.now() làm giá trị mặc định
        appointment.setUpdatedAt(LocalDateTime.now());
        appointment.setDateTime(appointmentDto.getDateTime());
        appointment.setReason(appointmentDto.getReason());
        appointment.setStatus("Confirmed");
        appointment.setDoctor(doctor); // Gán bác sĩ vào lịch khám
        appointment.setPatient(patient);
        appointment.setReceptionist(receptionist);
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment updateAppointment(Long id, AppointmentDto appointmentDto) {
        Appointment existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found with ID: " + id));

        // Cập nhật dateTime cho lịch khám
        existingAppointment.setUpdatedAt(LocalDateTime.now());
        existingAppointment.setDateTime(appointmentDto.getDateTime());
        existingAppointment.setReason(appointmentDto.getReason());
        existingAppointment.setStatus(appointmentDto.getStatus());

        // Cập nhật bác sĩ nếu có
        if (appointmentDto.getDoctorId() != null) {
            Doctor doctor = doctorRepository.findById(appointmentDto.getDoctorId())
                    .orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + appointmentDto.getDoctorId()));
            existingAppointment.setDoctor(doctor);
        }

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
    public void bookAppointment(AppointmentDto appointmentDto) {
        // Tìm bác sĩ trước khi tạo lịch khám
        Doctor doctor = doctorRepository.findById(appointmentDto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + appointmentDto.getDoctorId()));

        // Tạo mới bệnh nhân từ thông tin trong ScheduleDto
        Patient patient = new Patient();
        patient.setFirstName(appointmentDto.getPatient().getFirstName());
        patient.setLastName(appointmentDto.getPatient().getLastName());
        patient.setGender(appointmentDto.getPatient().getGender());
        patient.setPhone(appointmentDto.getPatient().getPhone());
        patient.setDateOfBirth(appointmentDto.getPatient().getDateOfBirth());
        patient.setDoctor(doctor);  // Gán bác sĩ cho bệnh nhân
        patient.setRole(Role.PATIENT); // Gán role là 'PATIENT'

        // Lưu bệnh nhân vào cơ sở dữ liệu
        Patient savedPatient = patientRepository.save(patient);

        // Tạo lịch khám
        Appointment appointment = new Appointment();
        appointment.setCreatedAt(LocalDateTime.now()); // Sử dụng LocalDateTime.now() làm giá trị mặc định
        appointment.setUpdatedAt(LocalDateTime.now());
        appointment.setDateTime(appointmentDto.getDateTime());
        appointment.setReason(appointmentDto.getReason());
        appointment.setStatus("Waiting");
        appointment.setDoctor(doctor); // Gán bác sĩ vào lịch khám
        appointment.setPatient(savedPatient); // Gán bệnh nhân vừa tạo vào lịch khám

        // Lưu lịch khám vào cơ sở dữ liệu
        appointmentRepository.save(appointment);
    }


}
