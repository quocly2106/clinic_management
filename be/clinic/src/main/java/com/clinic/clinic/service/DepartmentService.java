package com.clinic.clinic.service;

import com.clinic.clinic.dto.DepartmentDto;
import com.clinic.clinic.model.Department;

import java.util.List;

public interface DepartmentService {
    Department addDepartment(DepartmentDto departmentDto);
    Department updateDepartment(Long id, DepartmentDto departmentDto);
    void deleteDepartment(Long id);
    List<Department> getAllDepartments();
    Department getDepartmentById(Long id);
}
