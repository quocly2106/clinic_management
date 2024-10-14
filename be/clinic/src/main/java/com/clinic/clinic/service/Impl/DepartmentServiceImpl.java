package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.DepartmentDto;
import com.clinic.clinic.model.Department;
import com.clinic.clinic.repository.DepartmentRepository;
import com.clinic.clinic.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Department addDepartment(DepartmentDto departmentDto) {
        Department department = new Department();
        department.setName(departmentDto.getName());
        department.setDescription(departmentDto.getDescription());
        return departmentRepository.save(department);
    }

    @Override
    public Department updateDepartment(Long id, DepartmentDto departmentDto) {
        Department existingDepartment = departmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Department not found with ID: " + id));
        existingDepartment.setName(departmentDto.getName());
        existingDepartment.setDescription(departmentDto.getDescription());
        return departmentRepository.save(existingDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Department not found with ID: " + id));
    }
}
