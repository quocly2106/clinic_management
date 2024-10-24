package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.SpecialtyDto;
import com.clinic.clinic.model.Specialty;
import com.clinic.clinic.repository.SpecialtyRepository;
import com.clinic.clinic.service.SpecialtyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SpecialtyServiceImpl implements SpecialtyService {


    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Override
    public Specialty addSpecialty(SpecialtyDto specialtyDto) {
        Specialty specialty = new Specialty();
        specialty.setName(specialtyDto.getName());
        specialty.setDescription(specialtyDto.getDescription());
        specialty.setDateCreated(LocalDate.now());
        return specialtyRepository.save(specialty);
    }

    @Override
    public Specialty updateSpecialty(Long id, SpecialtyDto specialtyDto) {
        Specialty existingSpecialty = specialtyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Specialty not found with ID: " + id));
        existingSpecialty.setName(specialtyDto.getName());
        existingSpecialty.setDescription(specialtyDto.getDescription());
        return specialtyRepository.save(existingSpecialty);
    }

    @Override
    public void deleteSpecialty(Long id) {
        specialtyRepository.deleteById(id);
    }

    @Override
    public List<Specialty> getAllSpecialties() {
        return specialtyRepository.findAll();
    }


    @Override
    public Specialty getSpecialtyById(Long id) {
        return specialtyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Specialty not found with ID: " + id));
    }
}
