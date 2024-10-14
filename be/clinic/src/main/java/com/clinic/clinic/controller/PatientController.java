package com.clinic.clinic.controller;


import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.dto.PatientDto;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.model.Patient;
import com.clinic.clinic.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/patients")
public class PatientController {
    @Autowired
    private PatientService patientService;


    @PreAuthorize("hasAnyRole('ADMIN','RECEPTIONIST')")
    @PostMapping("/add")
    public ResponseEntity<Patient> createPatient(@RequestBody PatientDto patientDto){
        Patient createdPatient = patientService.addPatient(patientDto);
        return ResponseEntity.ok(createdPatient);
    }

    @PreAuthorize("hasAnyRole('ADMIN','RECEPTIONIST')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody PatientDto patientDto) {
        Patient updatedPatient = patientService.updatePatient(id, patientDto);
        return ResponseEntity.ok(updatedPatient);
    }

    @PreAuthorize("hasAnyRole('ADMIN','RECEPTIONIST')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Long id){
        patientService.deletePatient(id);
        return ResponseEntity.ok("Patient deleted successfully");
    }

    @PreAuthorize("hasAnyRole('ADMIN','RECEPTIONIST')")
    @GetMapping("/all")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    @PreAuthorize("hasAnyRole('ADMIN','RECEPTIONIST')")
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Patient patient = patientService.getPatientById(id);
        return ResponseEntity.ok(patient);
    }
}