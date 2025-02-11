package com.clinic.clinic.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum AppointmentStatus {
    WAITING,
    CONFIRMED,
    FINISHED,
    CANCELED;


    @JsonCreator
    public static AppointmentStatus fromString(String value) {
        if (value == null) {
            return null;
        }
        // Chuyển chuỗi thành enum, loại bỏ dấu cách thừa và so sánh không phân biệt chữ hoa/thường
        return AppointmentStatus.valueOf(value.trim().toUpperCase());
    }

    @JsonValue
    public String toJson() {
        return name();
    }
}