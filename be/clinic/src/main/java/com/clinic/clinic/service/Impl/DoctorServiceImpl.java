package com.clinic.clinic.service.Impl;

import com.clinic.clinic.config.Doctor.DoctorDetails;
import com.clinic.clinic.dto.ChangePasswordDto;
import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.dto.LoginDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.Specialty;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.model.Role;
import com.clinic.clinic.repository.SpecialtyRepository;
import com.clinic.clinic.repository.DoctorRepository;
import com.clinic.clinic.service.DoctorService;
import com.clinic.clinic.utils.ImageUpload;
import com.clinic.clinic.utils.JWTUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private ImageUpload imageUpload;


    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public Doctor addDoctor(DoctorDto doctorDto , MultipartFile imageFile) {
        Doctor doctor = convertToEntity(doctorDto);
        if (imageFile != null && !imageFile.isEmpty()) {
            if (!imageUpload.checkExisted(imageFile)) {
                imageUpload.uploadImage(imageFile);
            }
            doctor.setImage(imageFile.getOriginalFilename());
        }
        return doctorRepository.save(doctor);
    }

    @Override
    public String login(LoginDto loginDto) {
        Optional<Doctor> optionalDoctor = doctorRepository.findByEmail(loginDto.getEmail());

        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();

            if (passwordEncoder.matches(loginDto.getPassword(), doctor.getPassword())) {
                UserDetails doctorDetails = new DoctorDetails(doctor);
                String token = jwtUtils.generateToken(doctorDetails);

                // Trả về một JSON String với token và role
                return "{\"token\": \"" + token + "\", \"role\": \"" + doctor.getRole().name() + "\", \"doctorId\": " + doctor.getId() + "}";
            }
        }
        return null; // Trả về null nếu không tìm thấy bác sĩ hoặc mật khẩu không đúng
    }

    @Override
    public boolean isValidUser(String email, String password) {
        Optional<Doctor> optionalDoctor = doctorRepository.findByEmail(email);

        // Kiểm tra xem bác sĩ có tồn tại và so sánh mật khẩu
        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();
            // So sánh mật khẩu đã mã hóa
            return passwordEncoder.matches(password, doctor.getPassword());
        }

        return false; // Trả về false nếu không tìm thấy bác sĩ
    }


    @Transactional
    @Override
    public Doctor updateDoctor(Long id, DoctorDto doctorDto, MultipartFile imageFile) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        existingDoctor.setFirstName(doctorDto.getFirstName());
        existingDoctor.setLastName(doctorDto.getLastName());
        existingDoctor.setExperience(doctorDto.getExperience());
        existingDoctor.setDescription(doctorDto.getDescription());
        if (doctorDto.getEmail() != null && !doctorDto.getEmail().isEmpty()) {
            existingDoctor.setEmail(doctorDto.getEmail());
        }
        if (doctorDto.getPassword() != null && !doctorDto.getPassword().isEmpty()) {
            existingDoctor.setPassword(passwordEncoder.encode(doctorDto.getPassword()));
        }
        if (imageFile != null && !imageFile.isEmpty()) {
            if (!imageUpload.checkExisted(imageFile)) {
                imageUpload.uploadImage(imageFile);
            }
            existingDoctor.setImage(imageFile.getOriginalFilename());
        }

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

    public boolean changePassword(Long id, ChangePasswordDto changePasswordDto) {
        // Tìm kiếm người dùng theo ID
        Optional<Doctor> optionalDoctor = doctorRepository.findById(id);
        if (!optionalDoctor.isPresent()) {
            throw new RuntimeException("Doctor not found");
        }

        Doctor doctor = optionalDoctor.get();

        // Kiểm tra mật khẩu cũ
        if (!passwordEncoder.matches(changePasswordDto.getOldPassword(), doctor.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        // Cập nhật mật khẩu mới
        doctor.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        doctorRepository.save(doctor);
        return true;
    }


    private Doctor convertToEntity(DoctorDto doctorDto) {
        Doctor doctor = new Doctor();
        doctor.setFirstName(doctorDto.getFirstName());
        doctor.setLastName(doctorDto.getLastName());
        doctor.setExperience(doctorDto.getExperience());
        doctor.setDescription(doctorDto.getDescription());
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
