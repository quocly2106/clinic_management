package com.clinic.clinic.controller;

import com.clinic.clinic.dto.ServiceDto;
import com.clinic.clinic.model.Service;
import com.clinic.clinic.service.ServiceService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/services")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @PostMapping("/add")
    public ResponseEntity<Service> addService(
            @Valid @RequestPart("serviceDto") ServiceDto serviceDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        Service service = serviceService.addService(serviceDto, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(service);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Service> updateService(
            @PathVariable @NotNull Long id,
            @Valid @RequestPart("serviceDto") ServiceDto serviceDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        Service updatedService = serviceService.updateService(id, serviceDto, image);
        return ResponseEntity.ok(updatedService);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable @NotNull Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'RECEPTIONIST')")
    @GetMapping("/all")
    public ResponseEntity<List<Service>> getAllServices() {
        List<Service> serviceList = serviceService.getAllService();
        return ResponseEntity.ok(serviceList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable @NotNull Long id) {
        Service service = serviceService.getServiceById(id);
        return ResponseEntity.ok(service);
    }
}
