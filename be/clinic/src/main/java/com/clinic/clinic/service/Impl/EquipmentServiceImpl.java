package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.EquipmentDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.Equipment;
import com.clinic.clinic.repository.EquipmentRepository;
import com.clinic.clinic.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentServiceImpl implements EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Override
    public Equipment addEquipment(EquipmentDto equipmentDto) {
        Equipment equipment = new Equipment();
        equipment.setName(equipmentDto.getName());
        equipment.setType(equipmentDto.getType());
        equipment.setQuantity(equipmentDto.getQuantity());
        equipment.setManufacturer(equipmentDto.getManufacturer());
        equipment.setMaintenanceDate(equipmentDto.getMaintenanceDate());
        return equipmentRepository.save(equipment);
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
}
