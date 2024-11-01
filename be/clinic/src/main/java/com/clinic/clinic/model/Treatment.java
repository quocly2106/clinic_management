package com.clinic.clinic.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "treatments")
public class Treatment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "treatment_id")
    private Long id;

    @Column(nullable = false)
    private String description; // Mô tả điều trị

    @Column(nullable = false)
    @PastOrPresent
    private LocalDate treatmentDate; // Ngày điều trị

    @Column(nullable = false)
    private String status; // Trạng thái điều trị (ví dụ: "Đang thực hiện", "Hoàn thành", "Huỷ bỏ")

    @Column(length = 500) // Tùy chỉnh độ dài theo nhu cầu
    private String notes;

    // Quan hệ N-N với Medicine
    @ManyToMany
    @JoinTable(
            name = "treatment_medicine",
            joinColumns = @JoinColumn(name = "treatment_id"),
            inverseJoinColumns = @JoinColumn(name = "medicine_id")
    )
    private Set<Medicine> medicines;

    // Quan hệ N-N với Equipment
    @ManyToMany
    @JoinTable(
            name = "treatment_service",
            joinColumns = @JoinColumn(name = "treatment_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private Set<Service> services;

    // Quan hệ N-1 với Doctor
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    // Quan hệ N-1 với Patient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
