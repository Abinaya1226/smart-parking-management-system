package com.smartparking.repository;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.entity.SlotStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
    List<ParkingSlot> findByStatus(SlotStatus status);
    Optional<ParkingSlot> findBySlotNumber(String slotNumber);
    long countByStatus(SlotStatus status);
    Boolean existsBySlotNumber(String slotNumber);
}
