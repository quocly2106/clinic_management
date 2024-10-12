package com.clinic.clinic.service;

import com.clinic.clinic.dto.AdminDto;
import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.model.Doctor;


public interface DoctorService {

    Doctor addDoctor(DoctorDto doctorDto);
    String  login(DoctorDto doctorDto);
}
