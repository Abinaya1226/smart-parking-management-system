package com.smartparking.repository;

import com.smartparking.entity.Booking;
import com.smartparking.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Booking> findByParkingSlotIdAndBookingDateAndStatus(Long parkingSlotId, LocalDate bookingDate, BookingStatus status);
    long countByStatus(BookingStatus status);
    List<Booking> findAllByOrderByCreatedAtDesc();
}
