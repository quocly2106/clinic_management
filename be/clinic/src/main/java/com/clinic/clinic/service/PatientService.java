package com.clinic.clinic.service;

import com.clinic.clinic.dto.PatientDto;
import com.clinic.clinic.model.Patient;
import java.util.List;

public interface PatientService {
    Patient addPatient(PatientDto patientDto);

    Patient updatePatient(Long id, PatientDto patientDto);

    void  deletePatient(Long id);

    List<Patient> getAllPatients();

    Patient getPatientById(Long id);
}
