package com.clinic.clinic.service;

import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.dto.SpecialtyDto;
import com.clinic.clinic.model.Specialty;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SpecialtyService {
    Specialty addSpecialty(SpecialtyDto specialtyDto , MultipartFile imageFile);
    Specialty updateSpecialty(Long id, SpecialtyDto specialtyDto , MultipartFile imageFile);
    void deleteSpecialty(Long id);
    List<Specialty> getAllSpecialties();
    Specialty getSpecialtyById(Long id);
    List<DoctorDto> getDoctorsBySpecialty(Long specialtyId);
}
