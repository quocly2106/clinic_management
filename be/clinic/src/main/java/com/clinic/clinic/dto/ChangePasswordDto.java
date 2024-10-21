package com.clinic.clinic.dto;


import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto {
    private String oldPassword;
    @Size(min = 3, max = 10, message = "Invalid pass !(3-10 characters)")
    private String newPassword;
}
