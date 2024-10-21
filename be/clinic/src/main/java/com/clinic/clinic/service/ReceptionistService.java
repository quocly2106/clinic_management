package com.clinic.clinic.service;

import com.clinic.clinic.dto.ChangePasswordDto;
import com.clinic.clinic.dto.DoctorDto;
import com.clinic.clinic.dto.LoginDto;
import com.clinic.clinic.dto.ReceptionistDto;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.model.Receptionist;

import java.util.List;

public interface ReceptionistService {
    Receptionist addReceptionist(ReceptionistDto receptionistDto);

    String  login(LoginDto loginDto);

    boolean isValidUser(String email, String password);

    Receptionist updateReceptionist(Long id, ReceptionistDto receptionistDto);

    void  deleteReceptionist(Long id);

    List<Receptionist> getAllReceptionists();

    Receptionist getReceptionistById(Long id);

    boolean changePassword(Long id, ChangePasswordDto changePasswordDto);
}
