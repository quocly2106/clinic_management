package com.clinic.clinic.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EquipmentDto {

    @NotBlank(message = "Name is mandatory")
    private String name; // Tên thiết bị

    @NotBlank(message = "Type is mandatory")
    private String type; // Loại thiết bị

    @Min(value = 0, message = "Quantity must be non-negative")
    private Integer quantity; // Số lượng thiết bị

    @NotBlank(message = "Manufacturer is mandatory")
    private String manufacturer; // Nhà sản xuất

    private LocalDate maintenanceDate; // Ngày bảo trì thiết bị
}
