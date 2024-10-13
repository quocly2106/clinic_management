package com.clinic.clinic.config.Doctor;

import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DoctorDetailsService implements UserDetailsService {
    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorDetailsService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Doctor> optionalDoctor = doctorRepository.findByEmail(email);
        Doctor doctor = optionalDoctor.orElseThrow(() ->
                new UsernameNotFoundException("Doctor with email " + email + " not found")
        );
        System.out.println("Loading user: " + doctor.getEmail() + " with role: " + doctor.getRole());
        return new DoctorDetails(doctor);
    }
}
