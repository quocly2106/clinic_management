package com.clinic.clinic.controller;

import com.clinic.clinic.dto.ChangePasswordDto;
import com.clinic.clinic.dto.ReceptionistDto;
import com.clinic.clinic.model.Receptionist;
import com.clinic.clinic.service.ReceptionistService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/receptionists")
public class ReceptionistController {
    @Autowired
    private ReceptionistService receptionistService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Receptionist> createReceptionist(@Valid @RequestPart ReceptionistDto receptionistDto,
                                                           @RequestPart(value = "image", required = false) MultipartFile image) {
        Receptionist createdReceptionist = receptionistService.addReceptionist(receptionistDto,image);
        return ResponseEntity.ok(createdReceptionist);
    }


    @PreAuthorize("hasRole('ADMIN') or (hasRole('RECEPTIONIST') and #id == authentication.principal.id)")
    @PutMapping("/update/{id}")
    public ResponseEntity<Receptionist> updateDoctor(@PathVariable @NotNull Long id, @RequestPart ReceptionistDto receptionistDto,
                                                     @RequestPart(value = "image", required = false) MultipartFile image){
        Receptionist updatedReceptionist = receptionistService.updateReceptionist(id, receptionistDto,image);
        return ResponseEntity.ok(updatedReceptionist);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReceptionist(@PathVariable @NotNull Long id) {
        receptionistService.deleteReceptionist(id);
        return ResponseEntity.ok("Receptionist deleted successfully");
    }

    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','RECEPTIONIST')")
    @GetMapping("/all")
    public ResponseEntity<List<Receptionist>> getAllReceptionists() {
        List<Receptionist> Receptionists = receptionistService.getAllReceptionists();
        return ResponseEntity.ok(Receptionists);
    }

    @PreAuthorize("hasRole('ADMIN') or (hasRole('RECEPTIONIST') and #id == authentication.principal.id)")
    @GetMapping("/{id}")
    public ResponseEntity<Receptionist> getReceptionistById(@PathVariable @NotNull Long id) {
        Receptionist receptionist = receptionistService.getReceptionistById(id);
        return ResponseEntity.ok(receptionist);
    }


    @PreAuthorize("hasRole('ADMIN') or (hasRole('RECEPTIONIST') and #id == authentication.principal.id)")
    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable @NotNull Long id,
                                                 @Valid @RequestBody ChangePasswordDto changePasswordDto) {
        try {
            receptionistService.changePassword(id, changePasswordDto);
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

