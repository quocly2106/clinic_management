package com.clinic.clinic.email;

import com.clinic.clinic.model.Appointment;
import com.clinic.clinic.repository.AppointmentRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@EnableScheduling
public class ReminderScheduler {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private EmailService emailService;

    private static final Logger log = LoggerFactory.getLogger(SchedulerConfig.class);

    @Scheduled(cron = "0 0 */1  * * *")// Chạy mỗi giờ
    @Transactional
    public void sendReminders() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneDayFromNow = now.plusHours(2);

        List<Appointment> appointments = appointmentRepository
                .findByDateTimeBetweenAndReminderSentFalse(now, oneDayFromNow);

        if (appointments.isEmpty()) {
            log.info("No appointments found for reminders.");
            return;
        }

        for (Appointment appointment : appointments) {
            emailService.sendReminderEmail(
                    appointment.getPatient().getEmail(),
                    appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName(),
                    appointment.getDateTime()
            );

            appointment.setReminderSent(true);
            appointmentRepository.save(appointment);
        }
    }

}