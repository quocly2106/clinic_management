package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.dto.SpecialtyDto;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.model.Specialty;
import com.clinic.clinic.repository.DoctorRepository;
import com.clinic.clinic.repository.SpecialtyRepository;
import com.clinic.clinic.service.SpecialtyService;
import com.clinic.clinic.utils.ImageUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SpecialtyServiceImpl implements SpecialtyService {


    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ImageUpload imageUpload;

    @Override
    public Specialty addSpecialty(SpecialtyDto specialtyDto , MultipartFile imageFile) {
        Specialty specialty = new Specialty();
        specialty.setName(specialtyDto.getName());
        specialty.setDescription(specialtyDto.getDescription());
        if (imageFile != null && !imageFile.isEmpty()) {
            if (!imageUpload.checkExisted(imageFile)) {
                imageUpload.uploadImage(imageFile);
            }
            specialty.setImage(imageFile.getOriginalFilename());
        }
        specialty.setDateCreated(LocalDate.now());
        return specialtyRepository.save(specialty);
    }

    @Override
    public Specialty updateSpecialty(Long id, SpecialtyDto specialtyDto ,MultipartFile imageFile) {
        Specialty existingSpecialty = specialtyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Specialty not found with ID: " + id));
        existingSpecialty.setName(specialtyDto.getName());
        existingSpecialty.setDescription(specialtyDto.getDescription());
        if (imageFile != null && !imageFile.isEmpty()) {
            if (!imageUpload.checkExisted(imageFile)) {
                imageUpload.uploadImage(imageFile);
            }
            existingSpecialty.setImage(imageFile.getOriginalFilename());
        }
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

    @Override
    public List<DoctorDto> getDoctorsBySpecialty(Long specialtyId) {
        Specialty specialty = specialtyRepository.findById(specialtyId)
                .orElseThrow(() -> new RuntimeException("Specialty not found"));

        List<Doctor> doctors = doctorRepository.findBySpecialty(specialty);

        return doctors.stream().map(doctor -> {
            DoctorDto doctorDto = new DoctorDto();
            doctorDto.setFirstName(doctor.getFirstName());
            doctorDto.setLastName(doctor.getLastName());
            doctorDto.setExperience(doctor.getExperience());
            doctorDto.setDescription(doctor.getDescription());
            doctorDto.setEmail(doctor.getEmail());
            doctorDto.setImage(doctor.getImage());
            doctorDto.setSpecialtyId(specialtyId);
            return doctorDto;
        }).toList();
    }
}
