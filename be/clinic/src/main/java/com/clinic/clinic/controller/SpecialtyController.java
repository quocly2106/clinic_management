package com.clinic.clinic.controller;

import com.clinic.clinic.dto.SpecialtyDto;
import com.clinic.clinic.model.Specialty;
import com.clinic.clinic.service.SpecialtyService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/specialties")
public class SpecialtyController {

    @Autowired
    private SpecialtyService specialtyService;

    @PostMapping("/add")
    public ResponseEntity<Specialty> createSpecialty(@RequestBody SpecialtyDto specialtyDto) {
        Specialty createdSpecialty = specialtyService.addSpecialty(specialtyDto);
        return ResponseEntity.ok(createdSpecialty);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Specialty> updateSpecialty(@PathVariable @NotNull Long id,@RequestBody SpecialtyDto specialtyDto) {
        Specialty updatedSpecialty = specialtyService.updateSpecialty(id, specialtyDto);
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
}
