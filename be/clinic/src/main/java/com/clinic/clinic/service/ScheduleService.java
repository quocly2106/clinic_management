package com.clinic.clinic.service;

import com.clinic.clinic.dto.DepartmentDto;
import com.clinic.clinic.dto.ScheduleDto;
import com.clinic.clinic.model.Department;
import com.clinic.clinic.model.Schedule;

import java.util.List;

public interface ScheduleService {
    Schedule addSchedule(ScheduleDto scheduleDto);
    Schedule updateSchedule(Long id, ScheduleDto scheduleDto);
    void deleteSchedule(Long id);
    List<Schedule> getAllSchedule();
    Schedule getScheduleById(Long id);
}
