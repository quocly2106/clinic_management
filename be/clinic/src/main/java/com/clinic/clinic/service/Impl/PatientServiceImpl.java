package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.PatientDto;
import com.clinic.clinic.dto.ReceptionistDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.model.Patient;
import com.clinic.clinic.model.Receptionist;
import com.clinic.clinic.model.Role;
import com.clinic.clinic.repository.DoctorRepository;
import com.clinic.clinic.repository.PatientRepository;
import com.clinic.clinic.repository.ReceptionistRepository;
import com.clinic.clinic.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ReceptionistRepository receptionistRepository;

    @Override
    public Patient addPatient(PatientDto patientDto) {
        Patient patient = convertToEntity(patientDto);
        return patientRepository.save(patient);
    }

    @Override
    public Patient updatePatient(Long id, PatientDto patientDto) {
        // Tìm bệnh nhân theo ID
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + id));
        // Cập nhật các thông tin từ PatientDto
        existingPatient.setFirstName(patientDto.getFirstName());
        existingPatient.setLastName(patientDto.getLastName());
        existingPatient.setGender(patientDto.getGender());
        existingPatient.setDateOfBirth(patientDto.getDateOfBirth());
        existingPatient.setPhone(patientDto.getPhone());
        // Cập nhật doctor nếu có
        if (patientDto.getDoctorId() != null) {
            Doctor doctor = doctorRepository.findById(patientDto.getDoctorId())
                    .orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + patientDto.getDoctorId()));
            existingPatient.setDoctor(doctor);
        }
        // Cập nhật receptionist nếu có
        if (patientDto.getReceptionistId() != null) {
            Receptionist receptionist = receptionistRepository.findById(patientDto.getReceptionistId())
                    .orElseThrow(() -> new IllegalArgumentException("Receptionist not found with ID: " + patientDto.getReceptionistId()));
            existingPatient.setReceptionist(receptionist);
        }
        // Lưu bệnh nhân đã cập nhật vào cơ sở dữ liệu
        return patientRepository.save(existingPatient);
    }


    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
    }

    @Override
    public Patient findByPhone(String phone) {
        return patientRepository.findByPhone(phone);
    }

    private Patient convertToEntity(PatientDto patientDto) {
        Patient patient = new Patient();
        patient.setFirstName(patientDto.getFirstName());
        patient.setLastName(patientDto.getLastName());
        patient.setGender(patientDto.getGender());
        patient.setDateOfBirth(patientDto.getDateOfBirth());
        patient.setPhone(patientDto.getPhone());
        // Thiết lập doctor nếu có
        if (patientDto.getDoctorId() != null) {
            Doctor doctor = new Doctor();
            doctor.setId(patientDto.getDoctorId());
            patient.setDoctor(doctor);
        }
        // Thiết lập receptionist nếu có
        if (patientDto.getReceptionistId() != null) {
            Receptionist receptionist = new Receptionist();
            receptionist.setId(patientDto.getReceptionistId());
            patient.setReceptionist(receptionist);
        }
        patient.setRole(Role.PATIENT);

        return patient;
    }

}
