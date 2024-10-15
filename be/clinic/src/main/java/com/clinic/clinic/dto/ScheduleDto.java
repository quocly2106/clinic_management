package com.clinic.clinic.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDto {
    private LocalDate startTime;
    private LocalDate endTime;
    private Long doctorId;
    private Long receptionistId;
}
