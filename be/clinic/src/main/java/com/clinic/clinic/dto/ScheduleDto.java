package com.clinic.clinic.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDto {
    private LocalDateTime dateTime;
    private Long doctorId;
    private PatientDto patient;
}
