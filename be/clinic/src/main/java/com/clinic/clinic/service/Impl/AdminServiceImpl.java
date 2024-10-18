package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.AdminDto;
import com.clinic.clinic.dto.LoginDto;
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
                return jwtUtils.generateToken(userDetails);
            } else {
                // Xử lý mật khẩu không đúng
                System.out.println("Invalid password");
            }
        } else {
            // Xử lý email không tìm thấy
            System.out.println("Admin not found");
        }
        return null;
    }

    @Override
    public boolean isValidUser(String email, String password) {
        Optional<Admin> optionalAdmin = adminRepository.findByEmail(email);

        // Kiểm tra xem admin có tồn tại và so sánh mật khẩu
        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            // So sánh mật khẩu đã mã hóa
            return passwordEncoder.matches(password, admin.getPassword());
        }

        return false; // Trả về false nếu không tìm thấy admin
    }
}
