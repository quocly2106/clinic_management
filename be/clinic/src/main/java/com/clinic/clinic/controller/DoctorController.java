package com.clinic.clinic.controller;

import com.clinic.clinic.dto.ChangePasswordDto;
import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.service.DoctorService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping("/doctors")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Doctor> createDoctor(@Valid @RequestPart DoctorDto doctorDto,
                                               @RequestPart(value = "image", required = false) MultipartFile image) {
        Doctor createdDoctor = doctorService.addDoctor(doctorDto ,image);
        return ResponseEntity.ok(createdDoctor);
    }

    @PreAuthorize("hasRole('ADMIN') or (hasRole('DOCTOR') and #id == authentication.principal.id)")
    @PutMapping("/update/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable @NotNull Long id, @RequestPart DoctorDto doctorDto,
                                               @RequestPart(value = "image", required = false) MultipartFile image) {
        Doctor updatedDoctor = doctorService.updateDoctor(id, doctorDto,image);
        return ResponseEntity.ok(updatedDoctor);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable @NotNull Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok("Doctor deleted successfully");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'RECEPTIONIST')")
    @GetMapping("/all")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        System.out.println("Fetching all doctors");
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @PreAuthorize("hasRole('ADMIN') or (hasRole('DOCTOR') and #id == authentication.principal.id)")
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable @NotNull Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }

    @PreAuthorize("hasRole('ADMIN') or (hasRole('DOCTOR') and #id == authentication.principal.id)")
    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable @NotNull Long id,
                                                 @Valid @RequestBody ChangePasswordDto changePasswordDto) {
        try {
            doctorService.changePassword(id, changePasswordDto);
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
