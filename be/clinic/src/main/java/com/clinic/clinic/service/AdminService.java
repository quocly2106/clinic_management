package com.clinic.clinic.service;

import com.clinic.clinic.dto.AdminDto;
import com.clinic.clinic.dto.ChangePasswordDto;
import com.clinic.clinic.dto.LoginDto;
import com.clinic.clinic.model.Admin;

import java.util.Optional;

public interface AdminService {
    void register(AdminDto adminDto);

    String  login(LoginDto loginDto);

    public boolean isValidUser(String email, String password);

    Admin getAdminById(Long id);

    boolean changePassword(Long id, ChangePasswordDto changePasswordDto);
}
