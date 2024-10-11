package com.clinic.clinic.config;

import com.clinic.clinic.model.Admin;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class AdminDetails implements UserDetails {
    private final Admin admin;

    public AdminDetails(Admin admin) {
        this.admin = admin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Chỉ có một vai trò, trả về một quyền dựa trên vai trò
        return Collections.singletonList(new SimpleGrantedAuthority(admin.getRole().name()));
    }

    @Override
    public String getPassword() {
        return admin.getPassword();
    }

    @Override
    public String getUsername() {
        return admin.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Có thể thêm logic kiểm tra ngày hết hạn nếu cần
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Có thể thêm logic kiểm tra trạng thái khóa tài khoản nếu cần
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Có thể thêm logic kiểm tra thời hạn thông tin đăng nhập nếu cần
    }

    @Override
    public boolean isEnabled() {
        return true; // Có thể thêm logic kiểm tra trạng thái kích hoạt tài khoản nếu cần
    }
}
