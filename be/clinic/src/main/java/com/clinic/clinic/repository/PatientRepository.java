package com.clinic.clinic.repository;

import com.clinic.clinic.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository <Patient, Long> {
    Patient findByPhone(String phone);
}
