package com.clinic.clinic.config.Receptionist;

import com.clinic.clinic.model.Receptionist;
import com.clinic.clinic.repository.ReceptionistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReceptionistDetailsService implements UserDetailsService {

    private final ReceptionistRepository receptionistRepository;

    @Autowired
    public ReceptionistDetailsService(ReceptionistRepository receptionistRepository) {
        this.receptionistRepository = receptionistRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Receptionist> optionalReceptionist = receptionistRepository.findByEmail(email);
        Receptionist receptionist = optionalReceptionist.orElseThrow(() ->
                new UsernameNotFoundException("Reception with email " + email + " not found")
        );
        System.out.println("Loading user: " + receptionist.getEmail() + " with role: " + receptionist.getRole());
        return new ReceptionistDetails(receptionist);
    }
}
