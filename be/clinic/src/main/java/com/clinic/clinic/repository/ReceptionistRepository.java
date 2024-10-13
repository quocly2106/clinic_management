package com.clinic.clinic.repository;

import com.clinic.clinic.model.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReceptionistRepository extends JpaRepository<Receptionist, Long> {
    Optional<Receptionist> findByEmail(String email);
}
