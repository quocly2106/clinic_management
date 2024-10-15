package com.clinic.clinic.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "news")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private Admin author; // Tác giả là Admin, có thể thay đổi thành model User hoặc Doctor tùy yêu cầu

    @Column(nullable = false)
    private String status; // "Published", "Draft", "Archived"

    private String image; // URL hình ảnh đại diện (nếu có)

    @ElementCollection
    private Set<String> tags; // Từ khóa bài viết

    @Column(nullable = false)
    private String category; // Danh mục bài viết

    @Column(nullable = false)
    private Integer views; // Lượt xem bài viết

}
