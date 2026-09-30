package com.smartparking.service;

import com.smartparking.dto.ParkingSlotDTO;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.entity.SlotStatus;
import com.smartparking.exception.DuplicateEmailException;
import com.smartparking.exception.ResourceNotFoundException;
import com.smartparking.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParkingSlotService {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    public List<ParkingSlotDTO> getAllSlots() {
        return parkingSlotRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ParkingSlotDTO> getAvailableSlots() {
        return parkingSlotRepository.findByStatus(SlotStatus.AVAILABLE).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ParkingSlotDTO getSlotById(Long id) {
        ParkingSlot slot = parkingSlotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parking slot not found with ID: " + id));
        return convertToDTO(slot);
    }

    public ParkingSlotDTO createSlot(ParkingSlotDTO dto) {
        if (parkingSlotRepository.existsBySlotNumber(dto.getSlotNumber())) {
            throw new DuplicateEmailException("Parking slot " + dto.getSlotNumber() + " already exists!");
        }

        ParkingSlot slot = new ParkingSlot();
        slot.setSlotNumber(dto.getSlotNumber());
        slot.setVehicleType(dto.getVehicleType());
        slot.setStatus(dto.getStatus() != null ? dto.getStatus() : SlotStatus.AVAILABLE);
        slot.setFloor(dto.getFloor());

        ParkingSlot saved = parkingSlotRepository.save(slot);
        return convertToDTO(saved);
    }

    public ParkingSlotDTO updateSlot(Long id, ParkingSlotDTO dto) {
        ParkingSlot slot = parkingSlotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parking slot not found with ID: " + id));

        slot.setSlotNumber(dto.getSlotNumber());
        slot.setVehicleType(dto.getVehicleType());
        slot.setStatus(dto.getStatus());
        slot.setFloor(dto.getFloor());

        ParkingSlot updated = parkingSlotRepository.save(slot);
        return convertToDTO(updated);
    }

    public ParkingSlotDTO updateSlotStatus(Long id, SlotStatus status) {
        ParkingSlot slot = parkingSlotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parking slot not found with ID: " + id));

        slot.setStatus(status);
        ParkingSlot updated = parkingSlotRepository.save(slot);
        return convertToDTO(updated);
    }

    public void deleteSlot(Long id) {
        if (!parkingSlotRepository.existsById(id)) {
            throw new ResourceNotFoundException("Parking slot not found with ID: " + id);
        }
        parkingSlotRepository.deleteById(id);
    }

    public ParkingSlotDTO convertToDTO(ParkingSlot slot) {
        return new ParkingSlotDTO(
                slot.getId(),
                slot.getSlotNumber(),
                slot.getVehicleType(),
                slot.getStatus(),
                slot.getFloor()
        );
    }
}
