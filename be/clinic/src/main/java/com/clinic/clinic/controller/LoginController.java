package com.clinic.clinic.controller;

import com.clinic.clinic.dto.LoginDto;
import com.clinic.clinic.service.AdminService;
import com.clinic.clinic.service.DoctorService;
import com.clinic.clinic.service.ReceptionistService;
import com.clinic.clinic.utils.JWTUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ReceptionistService receptionistService;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto) {
        Map<String, String> response = authenticateUser(loginDto);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Login failed");
        }
    }

    private Map<String, String> authenticateUser(LoginDto loginDto) {
        System.out.println("Authenticating user: " + loginDto.getEmail());
        String token = null;
        String userRole = ""; // Biến để lưu role

        // Kiểm tra thông tin người dùng
        if (adminService.isValidUser(loginDto.getEmail(), loginDto.getPassword())) {
            userRole = "admin";
            token = adminService.login(loginDto);
        } else if (doctorService.isValidUser(loginDto.getEmail(), loginDto.getPassword())) {
            userRole = "doctor";
            token = doctorService.login(loginDto);
        } else if (receptionistService.isValidUser(loginDto.getEmail(), loginDto.getPassword())) {
            userRole = "receptionist";
            token = receptionistService.login(loginDto);
        }

        if (token != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);
            response.put("role", userRole); // Thêm role vào phản hồi
            return response; // Trả về token và role
        }

        return null; // Nếu không tìm thấy người dùng
    }
}
