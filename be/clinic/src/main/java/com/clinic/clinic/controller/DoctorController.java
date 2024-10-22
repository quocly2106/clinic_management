package com.clinic.clinic.controller;


import com.clinic.clinic.dto.ChangePasswordDto;
import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
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


    @PreAuthorize("hasRole('ADMIN') or (hasRole('DOCTOR') and #id == authentication.principal.id)")
    @PutMapping("/update/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody DoctorDto doctorDto) {

        Doctor updatedDoctor = doctorService.updateDoctor(id, doctorDto);
        return ResponseEntity.ok(updatedDoctor);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok("Doctor deleted successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @PreAuthorize("hasRole('ADMIN') or (hasRole('DOCTOR') and #id == authentication.principal.id)")
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }


    @PreAuthorize("hasRole('ADMIN') or (hasRole('DOCTOR') and #id == authentication.principal.id)")
    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable Long id,
                                                 @Valid @RequestBody ChangePasswordDto changePasswordDto) {
        try {
            doctorService.changePassword(id, changePasswordDto);
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
