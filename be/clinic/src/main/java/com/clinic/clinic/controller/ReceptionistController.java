package com.clinic.clinic.controller;

import com.clinic.clinic.dto.ChangePasswordDto;
import com.clinic.clinic.dto.ReceptionistDto;
import com.clinic.clinic.model.Receptionist;
import com.clinic.clinic.service.ReceptionistService;
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
@RequestMapping("/receptionists")
public class ReceptionistController {
    @Autowired
    private ReceptionistService receptionistService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Receptionist> createReceptionist(@RequestBody ReceptionistDto receptionistDto) {
        Receptionist createdReceptionist = receptionistService.addReceptionist(receptionistDto);
        return ResponseEntity.ok(createdReceptionist);
    }


    @PreAuthorize("hasRole('ADMIN') or (hasRole('RECEPTIONIST') and #id == authentication.principal.id)")
    @PutMapping("/update/{id}")
    public ResponseEntity<Receptionist> updateDoctor(@PathVariable Long id, @RequestBody ReceptionistDto receptionistDto) {

        Receptionist updatedReceptionist = receptionistService.updateReceptionist(id, receptionistDto);
        return ResponseEntity.ok(updatedReceptionist);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReceptionist(@PathVariable Long id) {
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
    public ResponseEntity<Receptionist> getReceptionistById(@PathVariable Long id) {
        Receptionist receptionist = receptionistService.getReceptionistById(id);
        return ResponseEntity.ok(receptionist);
    }


    @PreAuthorize("hasRole('ADMIN') or (hasRole('RECEPTIONIST') and #id == authentication.principal.id)")
    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable Long id,
                                                 @Valid @RequestBody ChangePasswordDto changePasswordDto) {
        try {
            receptionistService.changePassword(id, changePasswordDto);
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

