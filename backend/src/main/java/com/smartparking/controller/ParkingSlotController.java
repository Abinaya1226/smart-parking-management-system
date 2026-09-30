package com.smartparking.controller;

import com.smartparking.dto.ParkingSlotDTO;
import com.smartparking.entity.SlotStatus;
import com.smartparking.service.ParkingSlotService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking-slots")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingSlotController {

    @Autowired
    private ParkingSlotService parkingSlotService;

    @GetMapping
    public ResponseEntity<List<ParkingSlotDTO>> getAllSlots() {
        return ResponseEntity.ok(parkingSlotService.getAllSlots());
    }

    @GetMapping("/available")
    public ResponseEntity<List<ParkingSlotDTO>> getAvailableSlots() {
        return ResponseEntity.ok(parkingSlotService.getAvailableSlots());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParkingSlotDTO> getSlotById(@PathVariable Long id) {
        return ResponseEntity.ok(parkingSlotService.getSlotById(id));
    }

    @PostMapping
    public ResponseEntity<ParkingSlotDTO> createSlot(@Valid @RequestBody ParkingSlotDTO dto) {
        ParkingSlotDTO created = parkingSlotService.createSlot(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParkingSlotDTO> updateSlot(@PathVariable Long id, @Valid @RequestBody ParkingSlotDTO dto) {
        ParkingSlotDTO updated = parkingSlotService.updateSlot(id, dto);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ParkingSlotDTO> updateSlotStatus(@PathVariable Long id, @RequestParam SlotStatus status) {
        ParkingSlotDTO updated = parkingSlotService.updateSlotStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlot(@PathVariable Long id) {
        parkingSlotService.deleteSlot(id);
        return ResponseEntity.noContent().build();
    }
}
