package com.clinic.clinic.repository;

import com.clinic.clinic.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDateTimeBetweenAndReminderSentFalse(
            LocalDateTime start, LocalDateTime end);
}
