package com.clinic.clinic.service;

import com.clinic.clinic.dto.AdminDto;
import com.clinic.clinic.dto.LoginDto;
import com.clinic.clinic.model.Admin;

public interface AdminService {
    void register(AdminDto adminDto);

    String  login(LoginDto loginDto);

    public boolean isValidUser(String email, String password);
}
