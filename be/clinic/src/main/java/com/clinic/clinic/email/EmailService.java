package com.clinic.clinic.email;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TaskScheduler taskScheduler;

    public void scheduleReminderEmail(String toEmail, String patientName, LocalDateTime appointmentTime) {
        Instant reminderTime = appointmentTime.minusDays(1).atZone(ZoneId.systemDefault()).toInstant();

        taskScheduler.schedule(() -> {
            try {
                sendReminderEmail(toEmail, patientName, appointmentTime);
            } catch (Exception e) {
                log.error("Error sending reminder email to {}: {}", toEmail, e.getMessage(), e);
            }
        }, reminderTime);
    }


    // Thay 'private' bằng 'public' hoặc 'protected'
    public void sendReminderEmail(String toEmail, String patientName, LocalDateTime appointmentTime) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Nhắc nhở lịch hẹn khám bệnh");
        message.setText(String.format(
                "Kính gửi %s,\n\n" +
                        "Đây là email nhắc nhở về lịch hẹn khám bệnh của bạn vào ngày %s.\n\n" +
                        "Xin vui lòng đến đúng giờ.\n\n" +
                        "Trân trọng,\nPhòng khám",
                patientName,
                appointmentTime.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))
        ));

        mailSender.send(message);
        log.info("Reminder email sent to {} for appointment at {}", toEmail, appointmentTime);
    }
}
