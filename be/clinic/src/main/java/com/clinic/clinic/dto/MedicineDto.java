package com.clinic.clinic.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicineDto {

    @NotBlank(message = "Name is mandatory")
    private String name; // Tên thuốc

    @NotBlank(message = "Description is mandatory")
    private String description; // Mô tả thuốc

    private String image;

    @Min(value = 0, message = "Price must be non-negative")
    private Double price; // Giá thuốc

    @Min(value = 0, message = "Quantity must be non-negative")
    private Integer quantity; // Số lượng thuốc
}
