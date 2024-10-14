package com.clinic.clinic.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "treatments")
public class Treatments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "treatment_id")
    private Long id;

    @Column(nullable = false)
    private String description; // Mô tả điều trị

    @Column(nullable = false)
    @PastOrPresent
    private LocalDate treatmentDate; // Ngày điều trị

    // Quan hệ n-1 với Doctor
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    // Quan hệ n-1 với Patient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    // Quan hệ n-1 với Equipment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    // Quan hệ n-1 với Medicine
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;
}
