package com.clinic.clinic.controller;


import com.clinic.clinic.dto.DepartmentDto;
import com.clinic.clinic.dto.ScheduleDto;
import com.clinic.clinic.model.Department;
import com.clinic.clinic.model.Schedule;
import com.clinic.clinic.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;


    @PostMapping("/add")
    public ResponseEntity<Schedule> createSchedule(@RequestBody ScheduleDto scheduleDto) {
        Schedule createdDepartment = scheduleService.addSchedule(scheduleDto);
        return ResponseEntity.ok(createdDepartment);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable Long id, @RequestBody ScheduleDto scheduleDto) {
        Schedule updatedSchedule = scheduleService.updateSchedule(id, scheduleDto);
        return ResponseEntity.ok(updatedSchedule);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.ok("Schedule deleted successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        List<Schedule> schedules = scheduleService.getAllSchedule();
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Long id) {
        Schedule schedule = scheduleService.getScheduleById(id);
        return ResponseEntity.ok(schedule);
    }


}
