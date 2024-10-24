package com.clinic.clinic.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialtyDto {

    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Description is required")
    private String description;
    @NotBlank(message = "Date is required")
    private LocalDate dateCreated;

    // Bạn có thể thêm một danh sách các bác sĩ nếu cần
    private Set<DoctorDto> doctors; // Mối quan hệ 1-n với Doctor (nếu cần)


}
