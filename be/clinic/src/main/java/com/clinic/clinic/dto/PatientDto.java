package com.clinic.clinic.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDto {
    @NotBlank(message = "FirstName is required ")
    private String firstName;
    @NotBlank(message = "LastName is required ")
    private String lastName;
    private String gender;
    private LocalDate dateOfBirth;
    private Long doctorId;  // Sẽ sử dụng để liên kết với bác sĩ
    private Long receptionistId;  // Sử dụng nếu có liên kết với lễ tân
}
