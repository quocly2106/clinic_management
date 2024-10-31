package com.clinic.clinic.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {
    private Long doctorId;
    private Long patientId;
    private PatientDto patient;
    private Long ReceptionistId;
}
