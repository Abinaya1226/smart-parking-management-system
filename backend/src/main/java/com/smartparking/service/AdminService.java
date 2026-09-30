package com.smartparking.service;

import com.smartparking.dto.AdminDashboardDTO;
import com.smartparking.entity.BookingStatus;
import com.smartparking.entity.SlotStatus;
import com.smartparking.repository.BookingRepository;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public AdminDashboardDTO getDashboardStats() {
        long totalSlots = parkingSlotRepository.count();
        long availableSlots = parkingSlotRepository.countByStatus(SlotStatus.AVAILABLE);
        long bookedSlots = parkingSlotRepository.countByStatus(SlotStatus.BOOKED);
        long occupiedSlots = parkingSlotRepository.countByStatus(SlotStatus.OCCUPIED);
        long totalUsers = userRepository.count();
        long totalBookings = bookingRepository.count();
        long activeBookings = bookingRepository.countByStatus(BookingStatus.ACTIVE);

        return new AdminDashboardDTO(
                totalSlots,
                availableSlots,
                bookedSlots,
                occupiedSlots,
                totalUsers,
                totalBookings,
                activeBookings
        );
    }
}
