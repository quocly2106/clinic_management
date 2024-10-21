package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.AdminDto;
import com.clinic.clinic.dto.ChangePasswordDto;
import com.clinic.clinic.dto.LoginDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.Admin;
import com.clinic.clinic.model.Role;
import com.clinic.clinic.repository.AdminRepository;
import com.clinic.clinic.service.AdminService;
import com.clinic.clinic.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JWTUtils jwtUtils;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void register(AdminDto adminDto) {
        Admin admin = new Admin();
        admin.setFirstName(adminDto.getFirstName());
        admin.setLastName(adminDto.getLastName());
        admin.setEmail(adminDto.getEmail());
        admin.setPassword(passwordEncoder.encode(adminDto.getPassword()));
        admin.setImage(adminDto.getImage());
        admin.setRole(Role.ADMIN);
        adminRepository.save(admin);
    }

    @Override
    public String login(LoginDto loginDto) {
        Optional<Admin> optionalAdmin = adminRepository.findByEmail(loginDto.getEmail());

        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();

            if (passwordEncoder.matches(loginDto.getPassword(), admin.getPassword())) {
                UserDetails userDetails = org.springframework.security.core.userdetails.User
                        .withUsername(admin.getEmail())
                        .password(admin.getPassword())
                        .authorities(Role.ADMIN.name())
                        .build();
                String token = jwtUtils.generateToken(userDetails);
                return "{\"token\": \"" + token + "\", \"role\": \"" + admin.getRole().name() + "\", \"adminId\": " + admin.getId() + "}";
            } else {
                System.out.println("Invalid password");
            }
        } else {
            System.out.println("Admin not found");
        }
        return null;
    }

    @Override
    public boolean isValidUser(String email, String password) {
        Optional<Admin> optionalAdmin = adminRepository.findByEmail(email);

        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            return passwordEncoder.matches(password, admin.getPassword());
        }

        return false;
    }

    @Override
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
    }

    @Override
    public boolean changePassword(Long id, ChangePasswordDto changePasswordDto) {
        Optional<Admin> optionalAdmin = adminRepository.findById(id);
        if (!optionalAdmin.isPresent()) {
            throw new RuntimeException("Doctor not found");
        }
        Admin admin = optionalAdmin.get();
        if (!passwordEncoder.matches(changePasswordDto.getOldPassword(), admin.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        admin.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        adminRepository.save(admin);
        return true;
    }

}
