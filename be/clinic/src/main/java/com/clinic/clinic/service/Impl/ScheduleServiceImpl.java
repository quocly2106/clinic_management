package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.ScheduleDto;
import com.clinic.clinic.model.Department;
import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.model.Receptionist;
import com.clinic.clinic.model.Schedule;
import com.clinic.clinic.repository.DoctorRepository;
import com.clinic.clinic.repository.ReceptionistRepository;
import com.clinic.clinic.repository.ScheduleRepository;
import com.clinic.clinic.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ReceptionistRepository receptionistRepository;

    @Override
    public Schedule addSchedule(ScheduleDto scheduleDto) {
        if (scheduleDto.getStartTime().isAfter(scheduleDto.getEndTime()) ||
                scheduleDto.getStartTime().isEqual(scheduleDto.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before end time.");
        }

        Schedule schedule = new Schedule();
        schedule.setStartTime(scheduleDto.getStartTime());
        schedule.setEndTime(scheduleDto.getEndTime());

        if (scheduleDto.getDoctorId() != null) {
            Doctor doctor = new Doctor();
            doctor.setId(scheduleDto.getDoctorId());
            schedule.setDoctor(doctor);
        }

        if (scheduleDto.getReceptionistId() != null) {
            Receptionist receptionist = new Receptionist();
            receptionist.setId(scheduleDto.getReceptionistId());
            schedule.setReceptionist(receptionist);
        }

        return scheduleRepository.save(schedule);
    }


    @Override
    public Schedule updateSchedule(Long id, ScheduleDto scheduleDto) {
        if (scheduleDto.getStartTime().isAfter(scheduleDto.getEndTime()) ||
                scheduleDto.getStartTime().isEqual(scheduleDto.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before end time.");
        }

        Schedule existingSchedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found with ID: " + id));

        existingSchedule.setStartTime(scheduleDto.getStartTime());
        existingSchedule.setEndTime(scheduleDto.getEndTime());

        if (scheduleDto.getDoctorId() != null) {
            Doctor doctor = doctorRepository.findById(scheduleDto.getDoctorId())
                    .orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + scheduleDto.getDoctorId()));
            existingSchedule.setDoctor(doctor);
        }

        if (scheduleDto.getReceptionistId() != null) {
            Receptionist receptionist = receptionistRepository.findById(scheduleDto.getReceptionistId())
                    .orElseThrow(() -> new IllegalArgumentException("Receptionist not found with ID: " + scheduleDto.getReceptionistId()));
            existingSchedule.setReceptionist(receptionist);
        }

        return scheduleRepository.save(existingSchedule);
    }


    @Override
    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }

    @Override
    public List<Schedule> getAllSchedule() {
        return scheduleRepository.findAll();
    }

    @Override
    public Schedule getScheduleById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found with ID: " + id));
    }
}
