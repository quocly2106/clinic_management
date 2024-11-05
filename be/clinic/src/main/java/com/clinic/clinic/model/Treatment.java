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

    // Quan hệ 1-N với TreatmentMedicine
    @OneToMany(mappedBy = "treatment", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TreatmentMedicine> treatmentMedicines;

    // Quan hệ N-N với Equipment
    // Quan hệ 1-N với TreatmentEquipment
    @OneToMany(mappedBy = "treatment", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TreatmentService> treatmentServices;

    // Quan hệ N-1 với Doctor
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    // Quan hệ N-1 với Patient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
