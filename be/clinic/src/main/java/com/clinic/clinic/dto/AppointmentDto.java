package com.clinic.clinic.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {
    private Long doctorId;
    private Long patientId;
    private PatientDto patient;
    private LocalDateTime dateTime;
    private String reason;
    private String status;
    private Long ReceptionistId;
}
