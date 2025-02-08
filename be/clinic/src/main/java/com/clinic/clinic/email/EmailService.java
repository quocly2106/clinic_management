package com.clinic.clinic.email;

import com.clinic.clinic.model.AppointmentStatus;
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

    public void scheduleReminderEmailIfConfirmed(String toEmail, String patientName, LocalDateTime appointmentTime, AppointmentStatus status) {
        if (status == AppointmentStatus.CONFIRMED) {
            Instant reminderTime = appointmentTime.minusDays(1).atZone(ZoneId.systemDefault()).toInstant();

            taskScheduler.schedule(() -> {
                try {
                    sendReminderEmail(toEmail, patientName, appointmentTime);
                } catch (Exception e) {
                    log.error("Error sending reminder email to {}: {}", toEmail, e.getMessage(), e);
                }
            }, reminderTime);
        } else {
            log.info("Không gửi email nhắc nhở vì trạng thái lịch hẹn chưa được xác nhận.");
        }
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

    public void sendConfirmedEmail(String toEmail, String patientName, LocalDateTime appointmentTime) {
        sendEmail(toEmail, "Xác nhận lịch hẹn khám bệnh", String.format(
                "Kính gửi %s,\n\n" +
                        "Lịch hẹn khám bệnh của bạn vào ngày %s đã được xác nhận thành công.\n\n" +
                        "Xin vui lòng đến đúng giờ.\n\n" +
                        "Trân trọng,\nPhòng khám Nhân Tâm",
                patientName,
                appointmentTime.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))
        ));
    }

    public void sendCanceledEmail(String toEmail, String patientName, LocalDateTime appointmentTime) {
        sendEmail(toEmail, "Hủy lịch hẹn khám bệnh", String.format(
                "Kính gửi %s,\n\n" +
                        "Lịch hẹn khám bệnh của bạn vào ngày %s đã bị hủy.\n\n" +
                        "Vui lòng liên hệ phòng khám nếu bạn cần đặt lại lịch hẹn.\n\n" +
                        "Trân trọng,\nPhòng khám Nhân Tâm",
                patientName,
                appointmentTime.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))
        ));
    }

    public void sendFinishedEmail(String toEmail, String patientName, LocalDateTime appointmentTime) {
        sendEmail(toEmail, "Hoàn thành lịch hẹn khám bệnh", String.format(
                "Kính gửi %s,\n\n" +
                        "Lịch hẹn khám bệnh của bạn vào ngày %s đã hoàn thành.\n\n" +
                        "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ phòng khám.\n\n" +
                        "Trân trọng,\nPhòng khám Nhân Tâm",
                patientName,
                appointmentTime.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))
        ));
    }

    private void sendEmail(String toEmail, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
        log.info("Email sent to {} with subject: {}", toEmail, subject);
    }
}
