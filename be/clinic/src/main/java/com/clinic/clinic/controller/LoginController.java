package com.clinic.clinic.controller;

import com.clinic.clinic.dto.LoginDto;
import com.clinic.clinic.service.AdminService;
import com.clinic.clinic.service.DoctorService;
import com.clinic.clinic.service.ReceptionistService;
import com.clinic.clinic.utils.JWTUtils;
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
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        String token = authenticateUser(loginDto);
        if (token != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Login failed");
        }
    }

    private String authenticateUser(LoginDto loginDto) {

        String userRole = ""; // Biến để lưu role

        // Kiểm tra thông tin người dùng
        if (adminService.isValidUser(loginDto.getEmail(), loginDto.getPassword())) {
            userRole = "admin";
            return adminService.login(loginDto);
        } else if (doctorService.isValidUser(loginDto.getEmail(), loginDto.getPassword())) {
            userRole = "doctor";
            return doctorService.login(loginDto);
        } else if (receptionistService.isValidUser(loginDto.getEmail(), loginDto.getPassword())) {
            userRole = "receptionist";
            return receptionistService.login(loginDto);
        }

        return null; // Nếu không tìm thấy người dùng
    }
}
