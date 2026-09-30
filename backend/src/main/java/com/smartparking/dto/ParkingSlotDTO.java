package com.smartparking.dto;

import com.smartparking.entity.SlotStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ParkingSlotDTO {

    private Long id;

    @NotBlank(message = "Slot number is required")
    private String slotNumber;

    @NotBlank(message = "Vehicle type is required")
    private String vehicleType;

    @NotNull(message = "Status is required")
    private SlotStatus status;

    @NotBlank(message = "Floor location is required")
    private String floor;

    public ParkingSlotDTO() {
    }

    public ParkingSlotDTO(Long id, String slotNumber, String vehicleType, SlotStatus status, String floor) {
        this.id = id;
        this.slotNumber = slotNumber;
        this.vehicleType = vehicleType;
        this.status = status;
        this.floor = floor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSlotNumber() {
        return slotNumber;
    }

    public void setSlotNumber(String slotNumber) {
        this.slotNumber = slotNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public SlotStatus getStatus() {
        return status;
    }

    public void setStatus(SlotStatus status) {
        this.status = status;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }
}
