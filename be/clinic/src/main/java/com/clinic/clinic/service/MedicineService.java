package com.clinic.clinic.service;

import com.clinic.clinic.dto.MedicineDto;
import com.clinic.clinic.model.Medicine;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MedicineService {
    Medicine addMedicine(MedicineDto medicineDto, MultipartFile imageFile);
    Medicine updateMedicine(Long id, MedicineDto medicineDto, MultipartFile imageFile);
    void deleteMedicine(Long id);
    List<Medicine> getAllMedicines();
    Medicine getMedicineById(Long id);
}
