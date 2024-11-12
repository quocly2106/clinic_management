package com.clinic.clinic.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "specialties")
public class Specialty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "specialty_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // Tên khoa

    @Column(nullable = false)
    private String description; // Mô tả khoa

    private String image;

    @Column(name = "date_created", nullable = false)
    private LocalDate dateCreated = LocalDate.now();

    @OneToMany(mappedBy = "specialty", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Set<Doctor> doctors; // Mối quan hệ 1-n với Doctor
}
