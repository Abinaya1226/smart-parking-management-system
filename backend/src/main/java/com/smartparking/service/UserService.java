package com.smartparking.service;

import com.smartparking.dto.AuthResponse;
import com.smartparking.dto.LoginRequest;
import com.smartparking.dto.RegisterRequest;
import com.smartparking.dto.UserDTO;
import com.smartparking.entity.Role;
import com.smartparking.entity.User;
import com.smartparking.exception.DuplicateEmailException;
import com.smartparking.exception.ResourceNotFoundException;
import com.smartparking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email " + request.getEmail() + " is already registered!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Plain password for simple demo or can hash
        user.setPhone(request.getPhone());
        user.setVehicleNumber(request.getVehicleNumber());
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        return new AuthResponse(
                "Registration successful!",
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getPhone(),
                savedUser.getVehicleNumber(),
                savedUser.getRole()
        );
    }

    public AuthResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password!"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password!");
        }

        return new AuthResponse(
                "Login successful!",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getVehicleNumber(),
                user.getRole()
        );
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        return convertToDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getVehicleNumber(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
