package com.clinic.clinic.controller;


import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/doctors")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Doctor> createDoctor(@RequestBody DoctorDto doctorDto) {
        Doctor createdDoctor = doctorService.addDoctor(doctorDto);
        return ResponseEntity.ok(createdDoctor);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody DoctorDto doctorDto) {
        String token = doctorService.login(doctorDto);
        if (token != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);
            return ResponseEntity.ok(response); // Trả về token nếu đăng nhập thành công
        } else {
            return ResponseEntity.status(401).body("Login failed"); // Trả về thông báo thất bại
        }
    }


}

