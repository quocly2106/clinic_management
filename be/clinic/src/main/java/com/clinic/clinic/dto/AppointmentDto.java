package com.clinic.clinic.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Future;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {
    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Patient information is required")
    private PatientDto patient;

    @NotNull(message = "Date and Time are required")
    @Future(message = "Date and Time must be in the future")
    private LocalDateTime dateTime;

    @NotNull(message = "Reason is required")
    private String reason;

    @NotNull(message = "Status is required")
    private String status;

    @NotNull(message = "Receptionist ID is required")
    private Long receptionistId;
}
