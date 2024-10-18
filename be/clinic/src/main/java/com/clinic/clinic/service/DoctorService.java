package com.clinic.clinic.service;

import com.clinic.clinic.dto.AdminDto;
import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.dto.LoginDto;
import com.clinic.clinic.model.Doctor;

import java.util.List;


public interface DoctorService {

    Doctor addDoctor(DoctorDto doctorDto);
    String  login(LoginDto loginDto);

    boolean isValidUser(String email, String password);

    Doctor updateDoctor(Long id, DoctorDto doctorDto);

    void  deleteDoctor(Long id);

    List<Doctor> getAllDoctors();

    Doctor getDoctorById(Long id);


}
