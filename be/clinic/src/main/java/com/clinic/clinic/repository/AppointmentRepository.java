package com.clinic.clinic.repository;

import com.clinic.clinic.model.Appointment;
import com.clinic.clinic.model.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDateTimeBetweenAndReminderSentFalse(
            LocalDateTime start, LocalDateTime end);
    List<Appointment> findByStatus(AppointmentStatus status);
    boolean existsByIdAndDoctorId(Long id, Long doctorId);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.doctor.id = :doctorId AND a.dateTime BETWEEN :start AND :end")
    long countOverlappingAppointmentsForDoctor(@Param("doctorId") Long doctorId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

}
