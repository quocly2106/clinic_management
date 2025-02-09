package com.clinic.clinic.service.Impl;

import com.clinic.clinic.config.Receptionist.ReceptionistDetails;
import com.clinic.clinic.dto.ChangePasswordDto;
import com.clinic.clinic.dto.LoginDto;
import com.clinic.clinic.dto.ReceptionistDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.Receptionist;
import com.clinic.clinic.model.Role;
import com.clinic.clinic.repository.ReceptionistRepository;
import com.clinic.clinic.service.ReceptionistService;
import com.clinic.clinic.utils.ImageUpload;
import com.clinic.clinic.utils.JWTUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ReceptionistServiceImpl implements ReceptionistService {

    @Autowired
    private ReceptionistRepository receptionistRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private ImageUpload imageUpload;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Override
    public Receptionist addReceptionist(ReceptionistDto receptionistDto , MultipartFile imageFile) {
        Receptionist receptionist = convertToEntity(receptionistDto);
        if (imageFile != null && !imageFile.isEmpty()) {
            if (!imageUpload.checkExisted(imageFile)) {
                imageUpload.uploadImage(imageFile);
            }
            receptionist.setImage(imageFile.getOriginalFilename());
        }
        return receptionistRepository.save(receptionist);
    }

    @Override
    public String login(LoginDto loginDto) {
        Optional<Receptionist> optionalReceptionist = receptionistRepository.findByEmail(loginDto.getEmail());

        if (optionalReceptionist.isPresent()) {
            Receptionist receptionist = optionalReceptionist.get();

            if (passwordEncoder.matches(loginDto.getPassword(), receptionist.getPassword())) {
                UserDetails receptionistDetails = new ReceptionistDetails(receptionist);
                String token = jwtUtils.generateToken(receptionistDetails);

                // Trả về một JSON String với token, role và receptionistId
                return "{\"token\": \"" + token + "\", \"role\": \"" + receptionist.getRole().name() + "\", \"receptionistId\": " + receptionist.getId() + "}";
            }
        }
        return null;
    }


    @Override
    public boolean isValidUser(String email, String password) {
        Optional<Receptionist> optionalReceptionist = receptionistRepository.findByEmail(email);

        // Kiểm tra xem lễ tân có tồn tại và so sánh mật khẩu
        if (optionalReceptionist.isPresent()) {
            Receptionist receptionist = optionalReceptionist.get();
            // So sánh mật khẩu đã mã hóa
            return passwordEncoder.matches(password, receptionist.getPassword());
        }

        return false; // Trả về false nếu không tìm thấy lễ tân
    }


    @Transactional
    @Override
    public Receptionist updateReceptionist(Long id, ReceptionistDto receptionistDto , MultipartFile imageFile) {
        Receptionist existingReceptionist = receptionistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receptionist not found"));

        existingReceptionist.setFirstName(receptionistDto.getFirstName());
        existingReceptionist.setLastName(receptionistDto.getLastName());

        if (receptionistDto.getEmail() != null && !receptionistDto.getEmail().isEmpty()) {
            existingReceptionist.setEmail(receptionistDto.getEmail());
        }
        if (receptionistDto.getPassword() != null && !receptionistDto.getPassword().isEmpty()) {
            existingReceptionist.setPassword(passwordEncoder.encode(receptionistDto.getPassword()));
        }
        if (imageFile != null && !imageFile.isEmpty()) {
            if (!imageUpload.checkExisted(imageFile)) {
                imageUpload.uploadImage(imageFile);
            }
            existingReceptionist.setImage(imageFile.getOriginalFilename());
        }

        return receptionistRepository.save(existingReceptionist);
    }

    @Override
    public void deleteReceptionist(Long id) {
        receptionistRepository.deleteById(id);
    }

    @Override
    public List<Receptionist> getAllReceptionists() {
        return receptionistRepository.findAll();
    }

    @Override
    public Receptionist getReceptionistById(Long id) {
        return receptionistRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Receptionist not found"));
    }

    @Override
    public boolean changePassword(Long id, ChangePasswordDto changePasswordDto) {
        // Tìm kiếm người dùng theo ID
        Optional<Receptionist> optionalReceptionist = receptionistRepository.findById(id);
        if (!optionalReceptionist.isPresent()) {
            throw new RuntimeException("Doctor not found");
        }

        Receptionist receptionist = optionalReceptionist.get();

        // Kiểm tra mật khẩu cũ
        if (!passwordEncoder.matches(changePasswordDto.getOldPassword(), receptionist.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        // Cập nhật mật khẩu mới
        receptionist.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        receptionistRepository.save(receptionist);
        return true;
    }

    private Receptionist convertToEntity(ReceptionistDto receptionistDto) {
        Receptionist receptionist = new Receptionist();
        receptionist.setFirstName(receptionistDto.getFirstName());
        receptionist.setLastName(receptionistDto.getLastName());
        receptionist.setEmail(receptionistDto.getEmail());
        receptionist.setPassword(passwordEncoder.encode(receptionistDto.getPassword()));
        receptionist.setImage(receptionistDto.getImage());
        receptionist.setRole(Role.RECEPTIONIST);

        return receptionist;
    }
}
