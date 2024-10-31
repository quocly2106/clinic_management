package com.clinic.clinic.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "receptionists")
public class Receptionist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "receptionist_id")
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String image;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Quan hệ 1-n với Patient: Receptionist có thể quản lý nhiều bệnh nhân trong quy trình đặt lịch hoặc thanh toán
    @OneToMany(mappedBy = "receptionist", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("receptionist")
    private Collection<Patient> patients;

    // Quan hệ 1-n với Schedule: Receptionist có thể hỗ trợ trong việc quản lý lịch hẹn của bác sĩ
    @OneToMany(mappedBy = "receptionist", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("receptionist")
    private Collection<Appointment> appointments;
}
