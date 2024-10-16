package com.clinic.clinic.controller;

import com.clinic.clinic.dto.MedicineDto;
import com.clinic.clinic.model.Medicine;
import com.clinic.clinic.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping("/add")
    public ResponseEntity<Medicine> createMedicine(@Validated @RequestBody MedicineDto medicineDto) {
        Medicine savedMedicine = medicineService.addMedicine(medicineDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMedicine);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id, @Validated @RequestBody MedicineDto medicineDto) {
        Medicine updatedMedicine = medicineService.updateMedicine(id, medicineDto);
        return ResponseEntity.ok(updatedMedicine);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        List<Medicine> medicines = medicineService.getAllMedicines();
        return ResponseEntity.ok(medicines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        Medicine medicine = medicineService.getMedicineById(id);
        return ResponseEntity.ok(medicine);
    }
}
