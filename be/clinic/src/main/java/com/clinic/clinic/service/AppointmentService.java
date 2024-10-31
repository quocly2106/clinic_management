package com.clinic.clinic.service;

import com.clinic.clinic.dto.AppointmentDto;
import com.clinic.clinic.model.Appointment;

import java.util.List;

public interface AppointmentService {
    Appointment addAppointment(AppointmentDto appointmentDto);
    Appointment updateAppointment(Long id, AppointmentDto appointmentDto);
    void deleteAppointment(Long id);
    List<Appointment> getAllAppointment();
    Appointment getAppointmentById(Long id);
    void bookAppointment(AppointmentDto appointmentDto);
}
