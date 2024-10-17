package com.clinic.clinic.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NewsDto {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;

    @NotBlank(message = "Status is required")
    private String status;

    private String image;

    // Sử dụng HashSet thay vì Set để đảm bảo có constructor không tham số
    private Set<String> tags = new HashSet<>(); // Khởi tạo một HashSet mới

    private String category;

    private Integer views;
}
