package com.clinic.clinic.config.Doctor;

import com.clinic.clinic.model.Doctor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class DoctorDetails implements UserDetails {

    private final Doctor doctor;

    public DoctorDetails(Doctor doctor) {
        this.doctor = doctor;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(doctor.getRole().name()));
    }

    @Override
    public String getPassword() {
        return doctor.getPassword();
    }

    @Override
    public String getUsername() {
        return doctor.getEmail(); // Sử dụng email làm username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Bạn có thể thêm logic nếu cần
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Bạn có thể thêm logic nếu cần
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Bạn có thể thêm logic nếu cần
    }

    @Override
    public boolean isEnabled() {
        return true; // Bạn có thể thêm logic nếu cần
    }

    public Doctor getDoctor() {
        return doctor;
    }
    public Long getId() {
        return doctor.getId(); // Thêm getter cho ID
    }
}
