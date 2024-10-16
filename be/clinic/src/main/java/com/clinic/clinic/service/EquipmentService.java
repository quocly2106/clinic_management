package com.clinic.clinic.service;

import com.clinic.clinic.dto.EquipmentDto;
import com.clinic.clinic.model.Equipment;

import java.util.List;

public interface EquipmentService {
    Equipment addEquipment(EquipmentDto equipmentDto);
    Equipment updateEquipment(Long id, EquipmentDto equipmentDto);
    void deleteEquipment(Long id);
    List<Equipment> getAllEquipment();
    Equipment getEquipmentById(Long id);
}
