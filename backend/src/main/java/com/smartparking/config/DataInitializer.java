package com.smartparking.config;

import com.smartparking.entity.*;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Users if empty
        if (userRepository.count() == 0) {
            User admin = new User(
                    null,
                    "Admin Manager",
                    "admin@smartparking.com",
                    "admin123",
                    "9876543210",
                    "ADMIN-01",
                    Role.ADMIN
            );

            User user = new User(
                    null,
                    "John Doe",
                    "john@example.com",
                    "user123",
                    "9876543210",
                    "KA-01-AB-1234",
                    Role.USER
            );

            userRepository.saveAll(Arrays.asList(admin, user));
            System.out.println("✅ Default Admin (admin@smartparking.com / admin123) and User initialized!");
        }

        // 2. Seed 18 Parking Slots if empty
        if (parkingSlotRepository.count() == 0) {
            List<ParkingSlot> slots = Arrays.asList(
                    // Floor A (Ground Floor)
                    new ParkingSlot(null, "A1", "Car", SlotStatus.AVAILABLE, "Ground Floor"),
                    new ParkingSlot(null, "A2", "Car", SlotStatus.AVAILABLE, "Ground Floor"),
                    new ParkingSlot(null, "A3", "Car", SlotStatus.OCCUPIED, "Ground Floor"),
                    new ParkingSlot(null, "A4", "Car", SlotStatus.AVAILABLE, "Ground Floor"),
                    new ParkingSlot(null, "A5", "Car", SlotStatus.BOOKED, "Ground Floor"),
                    new ParkingSlot(null, "A6", "Car", SlotStatus.AVAILABLE, "Ground Floor"),

                    // Floor B (First Floor)
                    new ParkingSlot(null, "B1", "SUV", SlotStatus.AVAILABLE, "First Floor"),
                    new ParkingSlot(null, "B2", "SUV", SlotStatus.OCCUPIED, "First Floor"),
                    new ParkingSlot(null, "B3", "SUV", SlotStatus.AVAILABLE, "First Floor"),
                    new ParkingSlot(null, "B4", "SUV", SlotStatus.AVAILABLE, "First Floor"),
                    new ParkingSlot(null, "B5", "SUV", SlotStatus.BOOKED, "First Floor"),
                    new ParkingSlot(null, "B6", "SUV", SlotStatus.AVAILABLE, "First Floor"),

                    // Floor C (Second Floor)
                    new ParkingSlot(null, "C1", "Bike", SlotStatus.AVAILABLE, "Second Floor"),
                    new ParkingSlot(null, "C2", "Bike", SlotStatus.AVAILABLE, "Second Floor"),
                    new ParkingSlot(null, "C3", "Bike", SlotStatus.BOOKED, "Second Floor"),
                    new ParkingSlot(null, "C4", "Bike", SlotStatus.AVAILABLE, "Second Floor"),
                    new ParkingSlot(null, "C5", "Bike", SlotStatus.OCCUPIED, "Second Floor"),
                    new ParkingSlot(null, "C6", "Bike", SlotStatus.AVAILABLE, "Second Floor")
            );

            parkingSlotRepository.saveAll(slots);
            System.out.println("✅ Sample 18 parking slots (A1-A6, B1-B6, C1-C6) initialized!");
        }
    }
}
