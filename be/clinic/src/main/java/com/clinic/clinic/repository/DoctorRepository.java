package com.clinic.clinic.repository;

import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.model.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);

    List<Doctor> findBySpecialty(Specialty specialty);

}
