package com.clinic.clinic.service.Impl;

import com.clinic.clinic.config.Doctor.DoctorDetails;
import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.model.Admin;
import com.clinic.clinic.model.Department;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.model.Role;
import com.clinic.clinic.repository.DepartmentRepository;
import com.clinic.clinic.repository.DoctorRepository;
import com.clinic.clinic.service.DoctorService;
import com.clinic.clinic.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    DepartmentRepository departmentRepository;

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
            // Kiểm tra mật khẩu
            if (passwordEncoder.matches(doctorDto.getPassword(), doctor.getPassword())) {
                // Tạo và trả về token
                UserDetails doctorDetails = new DoctorDetails(doctor); // Chuyển đổi Doctor thành DoctorDetails
                return jwtUtils.generateToken(doctorDetails); // Gọi phương thức generateToken
            }
        }
        return null;
    }


    private Doctor convertToEntity(DoctorDto doctorDto) {
        Doctor doctor = new Doctor();
        doctor.setFirstName(doctorDto.getFirstName());
        doctor.setLastName(doctorDto.getLastName());
        doctor.setEmail(doctorDto.getEmail());
        doctor.setPassword(passwordEncoder.encode(doctorDto.getPassword()));
        doctor.setRole(Role.DOCTOR);
        if (doctorDto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(doctorDto.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            doctor.setDepartment(department);
        }
        return doctor;
    }


}
