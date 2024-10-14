package com.clinic.clinic.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentDto {

    @NotBlank(message = "Name is required")
    private String name; // Tên khoa

    @NotBlank(message = "Description is required")
    private String description; // Mô tả khoa

    // Bạn có thể thêm một danh sách các bác sĩ nếu cần
    private Set<DoctorDto> doctors; // Mối quan hệ 1-n với Doctor (nếu cần)
}
