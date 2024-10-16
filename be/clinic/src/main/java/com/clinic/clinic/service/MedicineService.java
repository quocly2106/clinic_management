package com.clinic.clinic.service;

import com.clinic.clinic.dto.MedicineDto;
import com.clinic.clinic.model.Medicine;

import java.util.List;

public interface MedicineService {
    Medicine addMedicine(MedicineDto medicineDto);
    Medicine updateMedicine(Long id, MedicineDto medicineDto);
    void deleteMedicine(Long id);
    List<Medicine> getAllMedicines();
    Medicine getMedicineById(Long id);
}
