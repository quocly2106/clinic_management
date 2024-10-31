package com.clinic.clinic.service;

import com.clinic.clinic.dto.ServiceDto;
import com.clinic.clinic.model.Service;

import java.util.List;

public interface ServiceService {
    Service addService(ServiceDto serviceDto);
    Service updateService(Long id, ServiceDto serviceDto);
    void deleteService(Long id);
    List<Service> getAllService();
    Service getServiceById(Long id);
}
