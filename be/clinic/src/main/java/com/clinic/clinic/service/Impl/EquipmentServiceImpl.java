package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.EquipmentDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.Admin;
import com.clinic.clinic.model.Equipment;
import com.clinic.clinic.repository.AdminRepository;
import com.clinic.clinic.repository.EquipmentRepository;
import com.clinic.clinic.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentServiceImpl implements EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    AdminRepository adminRepository;

    @Override
    public Equipment addEquipment(EquipmentDto equipmentDto) {
        Equipment equipment = convertToEntity(equipmentDto);

        // Lấy thông tin admin từ SecurityContextHolder
        String email = getCurrentUsername(); // Hàm lấy username từ context
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with email: " + email)); // Bây giờ dùng được orElseThrow

        equipment.setAdmin(admin); // Gán admin cho thiết bị

        return equipmentRepository.save(equipment);
    }

    // Hàm để lấy tên người dùng hiện tại
    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

    @Override
    public Equipment updateEquipment(Long id, EquipmentDto equipmentDto) {
        Equipment existingEquipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found with ID: " + id));

        existingEquipment.setName(equipmentDto.getName());
        existingEquipment.setType(equipmentDto.getType());
        existingEquipment.setQuantity(equipmentDto.getQuantity());
        existingEquipment.setManufacturer(equipmentDto.getManufacturer());
        existingEquipment.setMaintenanceDate(equipmentDto.getMaintenanceDate());

        return equipmentRepository.save(existingEquipment);
    }

    @Override
    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }

    @Override
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    @Override
    public Equipment getEquipmentById(Long id) {
        return equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found with ID: " + id));
    }

    private Equipment convertToEntity(EquipmentDto equipmentDto){
        Equipment equipment = new Equipment();
        equipment.setName(equipmentDto.getName());
        equipment.setType(equipmentDto.getType());
        equipment.setQuantity(equipmentDto.getQuantity());
        equipment.setManufacturer(equipmentDto.getManufacturer());
        equipment.setMaintenanceDate(equipmentDto.getMaintenanceDate());
        return  equipment;
    }
}
