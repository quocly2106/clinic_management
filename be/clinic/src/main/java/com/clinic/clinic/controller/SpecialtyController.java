package com.clinic.clinic.controller;

import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.dto.ServiceDto;
import com.clinic.clinic.dto.SpecialtyDto;
import com.clinic.clinic.model.Specialty;
import com.clinic.clinic.service.SpecialtyService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/specialties")
public class SpecialtyController {

    @Autowired
    private SpecialtyService specialtyService;

    @PostMapping("/add")
    public ResponseEntity<Specialty> createSpecialty(@RequestPart("specialtyDto") SpecialtyDto specialtyDto,
                                                     @RequestPart(value = "image", required = false) MultipartFile image) {
        Specialty createdSpecialty = specialtyService.addSpecialty(specialtyDto, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSpecialty);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Specialty> updateSpecialty(@PathVariable @NotNull Long id, @RequestPart("specialtyDto") SpecialtyDto specialtyDto,
                                                     @RequestPart(value = "image", required = false) MultipartFile image) {
        Specialty updatedSpecialty = specialtyService.updateSpecialty(id, specialtyDto, image);
        return ResponseEntity.ok(updatedSpecialty);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSpecialty(@PathVariable @NotNull Long id) {
        specialtyService.deleteSpecialty(id);
        return ResponseEntity.ok("Specialty deleted successfully");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'RECEPTIONIST')")
    @GetMapping("/all")
    public ResponseEntity<List<Specialty>> getAllSpecialties() {
        List<Specialty> specialties = specialtyService.getAllSpecialties();
        return ResponseEntity.ok(specialties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Specialty> getSpecialtyById(@PathVariable @NotNull Long id) {
        Specialty specialty = specialtyService.getSpecialtyById(id);
        return ResponseEntity.ok(specialty);
    }


    @GetMapping("/{id}/doctors")
    public ResponseEntity<List<DoctorDto>> getDoctorsBySpecialty(@PathVariable @NotNull Long id) {
        List<DoctorDto> doctors = specialtyService.getDoctorsBySpecialty(id);
        return ResponseEntity.ok(doctors);
    }
}
