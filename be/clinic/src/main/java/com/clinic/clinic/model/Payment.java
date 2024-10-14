package com.clinic.clinic.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long id;

    @Column(nullable = false)
    private double amount; // Số tiền thanh toán

    @Column(nullable = false)
    private LocalDate date; // Ngày thanh toán

    @Column(nullable = false)
    private String method; // Phương thức thanh toán (VD: tiền mặt, thẻ)

    // Quan hệ n-1 với Patient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    // Quan hệ n-1 với Treatment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treatment_id", nullable = false)
    private Treatments treatment;
}
