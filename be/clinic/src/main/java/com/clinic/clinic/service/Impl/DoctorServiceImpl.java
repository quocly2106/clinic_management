package com.clinic.clinic.service.Impl;

import com.clinic.clinic.config.Doctor.DoctorDetails;
import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.Specialty;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.model.Role;
import com.clinic.clinic.repository.SpecialtyRepository;
import com.clinic.clinic.repository.DoctorRepository;
import com.clinic.clinic.service.DoctorService;
import com.clinic.clinic.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private SpecialtyRepository specialtyRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public Doctor addDoctor(DoctorDto doctorDto) {
        Doctor doctor = convertToEntity(doctorDto);
        return doctorRepository.save(doctor);
    }

    @Override
    public String login(DoctorDto doctorDto) {
        Optional<Doctor> optionalDoctor = doctorRepository.findByEmail(doctorDto.getEmail());
        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();
            if (passwordEncoder.matches(doctorDto.getPassword(), doctor.getPassword())) {
                UserDetails doctorDetails = new DoctorDetails(doctor);
                return jwtUtils.generateToken(doctorDetails);
            }
        }
        return null;
    }

    @Override
    public Doctor updateDoctor(Long id, DoctorDto doctorDto) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        existingDoctor.setFirstName(doctorDto.getFirstName());
        existingDoctor.setLastName(doctorDto.getLastName());
        if (doctorDto.getEmail() != null && !doctorDto.getEmail().isEmpty()) {
            existingDoctor.setEmail(doctorDto.getEmail());
        } else {
            throw new RuntimeException("Email cannot be null or empty");
        }
        if (doctorDto.getPassword() != null && !doctorDto.getPassword().isEmpty()) {
            existingDoctor.setPassword(passwordEncoder.encode(doctorDto.getPassword()));
        }
        existingDoctor.setImage(doctorDto.getImage());
        if (doctorDto.getSpecialtyId() != null) {
            Specialty specialty = specialtyRepository.findById(doctorDto.getSpecialtyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Specialty not found"));
            existingDoctor.setSpecialty(specialty);
        }
        return doctorRepository.save(existingDoctor);
    }

    @Override
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
    }

    private Doctor convertToEntity(DoctorDto doctorDto) {
        Doctor doctor = new Doctor();
        doctor.setFirstName(doctorDto.getFirstName());
        doctor.setLastName(doctorDto.getLastName());
        doctor.setEmail(doctorDto.getEmail());
        doctor.setPassword(passwordEncoder.encode(doctorDto.getPassword()));
        doctor.setImage(doctorDto.getImage());
        doctor.setRole(Role.DOCTOR);
        if (doctorDto.getSpecialtyId() != null) {
            Specialty specialty = specialtyRepository.findById(doctorDto.getSpecialtyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Specialty not found"));
            doctor.setSpecialty(specialty);
        }
        return doctor;
    }
}
