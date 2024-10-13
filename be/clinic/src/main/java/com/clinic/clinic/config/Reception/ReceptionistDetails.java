package com.clinic.clinic.config.Reception;

import com.clinic.clinic.model.Receptionist;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class ReceptionistDetails implements UserDetails {

    private final Receptionist receptionist;

    public ReceptionistDetails(Receptionist receptionist) {
        this.receptionist = receptionist;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + receptionist.getRole().name()));
    }

    @Override
    public String getPassword() {
        return receptionist.getPassword();
    }

    @Override
    public String getUsername() {
        return receptionist.getEmail();
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

    public Receptionist getReceptionist() {
        return receptionist;
    }
    public Long getId() {
        return receptionist.getId(); // Thêm getter cho ID
    }
}
