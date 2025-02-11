package com.clinic.clinic.controller;


import com.clinic.clinic.dto.AppointmentDto;
import com.clinic.clinic.dto.BookAppointmentDto;
import com.clinic.clinic.email.EmailService;
import com.clinic.clinic.model.Appointment;
import com.clinic.clinic.model.AppointmentStatus;
import com.clinic.clinic.repository.AppointmentRepository;
import com.clinic.clinic.service.AppointmentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/add")
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentDto appointmentDto) {
        Appointment createAppointment = appointmentService.addAppointment(appointmentDto);
        return ResponseEntity.ok(createAppointment);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable @NotNull Long id,
            @RequestBody AppointmentDto appointmentDto,
            Authentication authentication) {

        // Lấy email của người dùng từ token
        String username = authentication.getName();

        // Kiểm tra xem người dùng có phải là admin không
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        // Gọi service với username và quyền hạn
        Appointment updatedAppointment = appointmentService.updateAppointment(id, appointmentDto, username, isAdmin);

        return ResponseEntity.ok(updatedAppointment);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable @NotNull Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Appointment deleted successfully");
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Appointment>> getAppointmentsByStatus(@PathVariable String status) {
        AppointmentStatus appointmentStatus = AppointmentStatus.fromString(status); // Dùng phương thức từ enum để chuyển đổi
        List<Appointment> appointmentByStatus = appointmentService.getAppointmentsByStatus(appointmentStatus);
        return ResponseEntity.ok(appointmentByStatus);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointment();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable @NotNull Long id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("/book-appointment")
    public ResponseEntity<?> bookAppointment(@Valid @RequestBody BookAppointmentDto bookAppointmentDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = bindingResult.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errorMessages);
        }
        appointmentService.bookAppointment(bookAppointmentDto);
        return ResponseEntity.ok("Appointment booked successfully");
    }
}
