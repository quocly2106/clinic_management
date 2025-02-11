package com.clinic.clinic.service;

import com.clinic.clinic.dto.AppointmentDto;
import com.clinic.clinic.dto.BookAppointmentDto;
import com.clinic.clinic.model.Appointment;
import com.clinic.clinic.model.AppointmentStatus;

import java.util.List;

public interface AppointmentService {
    Appointment addAppointment(AppointmentDto appointmentDto);
    Appointment updateAppointment(Long id, AppointmentDto appointmentDto, String username, boolean isAdmin);

    void deleteAppointment(Long id);
    List<Appointment> getAllAppointment();
    Appointment getAppointmentById(Long id);
    void bookAppointment(BookAppointmentDto bookAppointmentDto);
    List<Appointment> getAppointmentsByStatus(AppointmentStatus status);
    boolean isDoctorOfAppointment(Long doctorId, Long appointmentId);
}
