package com.clinic.clinic.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookAppointmentDto {
    @NotNull(message = "Doctor information is required")
    private String doctorFirstName;
    @NotNull(message = "Doctor information is required")
    private String doctorLastName;

    @NotNull(message = "Specialty is required")
    private String specialtyName;

    @NotNull(message = "Patient information is required")
    private PatientDto patient;

    @NotNull(message = "Date and Time are required")
    @Future(message = "Date and Time must be in the future")
    private LocalDateTime dateTime;

    @NotNull(message = "Reason is required")
    private String reason;
}