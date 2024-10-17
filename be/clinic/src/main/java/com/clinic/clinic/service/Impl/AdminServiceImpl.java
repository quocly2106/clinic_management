package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.AdminDto;
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
        // Mã hóa password trước khi lưu vào DB
        admin.setPassword(passwordEncoder.encode(adminDto.getPassword()));
        admin.setImage(adminDto.getImage());
        admin.setRole(Role.ADMIN); // Thiết lập role cho admin
        adminRepository.save(admin);
    }

    public String login(AdminDto adminDto) {
        Optional<Admin> optionalAdmin = adminRepository.findByEmail(adminDto.getEmail());

        // Kiểm tra nếu Admin tồn tại
        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get(); // Lấy Admin từ Optional

            // Kiểm tra password
            if (passwordEncoder.matches(adminDto.getPassword(), admin.getPassword())) {
                // Tạo và trả về token
                UserDetails userDetails = org.springframework.security.core.userdetails.User
                        .withUsername(admin.getEmail())
                        .password(admin.getPassword())
                        .authorities(Role.ADMIN.name())
                        .build();
                return jwtUtils.generateToken(userDetails);
            }
        }
        return null; // Nếu không thành công
    }
}
