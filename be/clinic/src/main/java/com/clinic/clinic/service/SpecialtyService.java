package com.clinic.clinic.service;

import com.clinic.clinic.dto.SpecialtyDto;
import com.clinic.clinic.model.Specialty;

import java.util.List;

public interface SpecialtyService {
    Specialty addSpecialty(SpecialtyDto specialtyDto);
    Specialty updateSpecialty(Long id, SpecialtyDto specialtyDto);
    void deleteSpecialty(Long id);
    List<Specialty> getAllSpecialties();
    Specialty getSpecialtyById(Long id);
}
