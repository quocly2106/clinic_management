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


    @GetMapping("/admin/dashboard")
    public ResponseEntity<String> getDashboard() {
        return ResponseEntity.ok("Welcome to the admin dashboard!");
    }
}
