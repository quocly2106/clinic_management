package com.clinic.clinic.controller;

import com.clinic.clinic.dto.AdminDto;
import com.clinic.clinic.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AdminDto adminDto) {
        adminService.register(adminDto);
        return ResponseEntity.ok("Admin registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminDto adminDto) {
        String token = adminService.login(adminDto); // Gọi phương thức login
        if (token != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);

            return ResponseEntity.ok(response); // Trả về token nếu đăng nhập thành công
        } else {
            return ResponseEntity.status(401).body("Login failed"); // Trả về thông báo thất bại
        }
    }

    @GetMapping("/admin/dashboard")
    public ResponseEntity<String> getDashboard() {
        return ResponseEntity.ok("Welcome to the admin dashboard!");
    }
}
