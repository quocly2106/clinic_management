package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.EquipmentDto;
import com.clinic.clinic.dto.MedicineDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.Admin;
import com.clinic.clinic.model.Equipment;
import com.clinic.clinic.model.Medicine;
import com.clinic.clinic.repository.AdminRepository;
import com.clinic.clinic.repository.MedicineRepository;
import com.clinic.clinic.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    AdminRepository adminRepository;

    @Override
    public Medicine addMedicine(MedicineDto medicineDto) {
        Medicine medicine = convertToEntity(medicineDto);

        // Lấy thông tin admin từ SecurityContextHolder
        String email = getCurrentUsername(); // Hàm lấy username từ context
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with email: " + email)); // Bây giờ dùng được orElseThrow

        medicine.setAdmin(admin); // Gán admin cho thiết bị

        return medicineRepository.save(medicine);
    }

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

    @Override
    public Medicine updateMedicine(Long id, MedicineDto medicineDto) {
        Medicine existingMedicine = medicineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine not found with ID: " + id));
        existingMedicine.setName(medicineDto.getName());
        existingMedicine.setDescription(medicineDto.getDescription());
        existingMedicine.setPrice(medicineDto.getPrice());
        existingMedicine.setQuantity(medicineDto.getQuantity());
        return medicineRepository.save(existingMedicine);
    }

    @Override
    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @Override
    public Medicine getMedicineById(Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine not found with ID: " + id));
    }

    private Medicine convertToEntity(MedicineDto medicineDto){
        Medicine medicine = new Medicine();
        medicine.setName(medicineDto.getName());
        medicine.setDescription(medicineDto.getDescription());
        medicine.setPrice(medicineDto.getPrice());
        medicine.setQuantity(medicineDto.getQuantity());
        return  medicine;
    }
}
