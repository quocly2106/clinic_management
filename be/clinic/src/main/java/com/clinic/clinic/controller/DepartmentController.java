package com.clinic.clinic.controller;

import com.clinic.clinic.dto.DepartmentDto;
import com.clinic.clinic.model.Department;
import com.clinic.clinic.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @PostMapping("/add")
    public ResponseEntity<Department> createDepartment(@RequestBody DepartmentDto departmentDto) {
        Department createdDepartment = departmentService.addDepartment(departmentDto);
        return ResponseEntity.ok(createdDepartment);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody DepartmentDto departmentDto) {
        Department updatedDepartment = departmentService.updateDepartment(id, departmentDto);
        return ResponseEntity.ok(updatedDepartment);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Department deleted successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        Department department = departmentService.getDepartmentById(id);
        return ResponseEntity.ok(department);
    }
}
