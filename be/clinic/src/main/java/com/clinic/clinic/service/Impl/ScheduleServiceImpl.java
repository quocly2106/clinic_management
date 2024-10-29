package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.ScheduleDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.*;
import com.clinic.clinic.repository.DoctorRepository;
import com.clinic.clinic.repository.PatientRepository;
import com.clinic.clinic.repository.ScheduleRepository;
import com.clinic.clinic.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Schedule addSchedule(ScheduleDto scheduleDto) {
        Doctor doctor = doctorRepository.findById(scheduleDto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + scheduleDto.getDoctorId()));
        Patient patient = new Patient();
        patient.setFirstName(scheduleDto.getPatient().getFirstName());
        patient.setLastName(scheduleDto.getPatient().getLastName());
        patient.setGender(scheduleDto.getPatient().getGender());
        patient.setDateOfBirth(scheduleDto.getPatient().getDateOfBirth());
        patient.setPhone(scheduleDto.getPatient().getPhone());
        patient.setDoctor(doctor);  // Gán bác sĩ cho bệnh nhân
        patient.setRole(Role.PATIENT); // Gán role là 'PATIENT'
        Patient savedPatient = patientRepository.save(patient);

        Schedule schedule = new Schedule();
        schedule.setCreatedAt(LocalDateTime.now()); // Sử dụng LocalDateTime.now() làm giá trị mặc định
        schedule.setUpdatedAt(LocalDateTime.now());
        schedule.setDoctor(doctor); // Gán bác sĩ vào lịch khám
        schedule.setPatient(savedPatient);
        return scheduleRepository.save(schedule);
    }

    @Override
    public Schedule updateSchedule(Long id, ScheduleDto scheduleDto) {
        Schedule existingSchedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found with ID: " + id));

        // Cập nhật dateTime cho lịch khám
        existingSchedule.setUpdatedAt(LocalDateTime.now());

        // Cập nhật bác sĩ nếu có
        if (scheduleDto.getDoctorId() != null) {
            Doctor doctor = doctorRepository.findById(scheduleDto.getDoctorId())
                    .orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + scheduleDto.getDoctorId()));
            existingSchedule.setDoctor(doctor);
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

    @Override
    public void bookAppointment(ScheduleDto scheduleDto) {
        // Tìm bác sĩ trước khi tạo lịch khám
        Doctor doctor = doctorRepository.findById(scheduleDto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + scheduleDto.getDoctorId()));

        // Tạo mới bệnh nhân từ thông tin trong ScheduleDto
        Patient patient = new Patient();
        patient.setFirstName(scheduleDto.getPatient().getFirstName());
        patient.setLastName(scheduleDto.getPatient().getLastName());
        patient.setGender(scheduleDto.getPatient().getGender());
        patient.setPhone(scheduleDto.getPatient().getPhone());
        patient.setDateOfBirth(scheduleDto.getPatient().getDateOfBirth());
        patient.setDoctor(doctor);  // Gán bác sĩ cho bệnh nhân
        patient.setRole(Role.PATIENT); // Gán role là 'PATIENT'

        // Lưu bệnh nhân vào cơ sở dữ liệu
        Patient savedPatient = patientRepository.save(patient);

        // Tạo lịch khám
        Schedule schedule = new Schedule();
        schedule.setCreatedAt(LocalDateTime.now()); // Sử dụng LocalDateTime.now() làm giá trị mặc định
        schedule.setUpdatedAt(LocalDateTime.now());
        schedule.setDoctor(doctor); // Gán bác sĩ vào lịch khám
        schedule.setPatient(savedPatient); // Gán bệnh nhân vừa tạo vào lịch khám

        // Lưu lịch khám vào cơ sở dữ liệu
        scheduleRepository.save(schedule);
    }


}
