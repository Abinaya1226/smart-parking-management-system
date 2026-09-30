package com.smartparking.service;

import com.smartparking.dto.BookingRequest;
import com.smartparking.dto.BookingResponse;
import com.smartparking.entity.*;
import com.smartparking.exception.InvalidBookingException;
import com.smartparking.exception.ResourceNotFoundException;
import com.smartparking.exception.SlotUnavailableException;
import com.smartparking.repository.BookingRepository;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        // 1. Check user existence
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

        // 2. Check parking slot existence
        ParkingSlot slot = parkingSlotRepository.findById(request.getParkingSlotId())
                .orElseThrow(() -> new ResourceNotFoundException("Parking slot not found with ID: " + request.getParkingSlotId()));

        // 3. Check slot availability
        if (slot.getStatus() != SlotStatus.AVAILABLE) {
            throw new SlotUnavailableException("Parking slot " + slot.getSlotNumber() + " is currently " + slot.getStatus() + " and cannot be booked!");
        }

        // 4. Validate start time < end time
        if (request.getStartTime().isAfter(request.getEndTime()) || request.getStartTime().equals(request.getEndTime())) {
            throw new InvalidBookingException("Start time must be strictly before end time!");
        }

        // 5. Create booking entity
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setParkingSlot(slot);
        booking.setVehicleNumber(request.getVehicleNumber());
        booking.setBookingDate(request.getBookingDate());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setStatus(BookingStatus.ACTIVE);

        // 6. Update slot status to BOOKED
        slot.setStatus(SlotStatus.BOOKED);
        parkingSlotRepository.save(slot);

        // 7. Save booking
        Booking savedBooking = bookingRepository.save(booking);

        return convertToResponse(savedBooking);
    }

    @Transactional
    public BookingResponse cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new InvalidBookingException("Booking is already cancelled!");
        }

        // Update booking status
        booking.setStatus(BookingStatus.CANCELLED);

        // Revert slot status back to AVAILABLE
        ParkingSlot slot = booking.getParkingSlot();
        slot.setStatus(SlotStatus.AVAILABLE);
        parkingSlotRepository.save(slot);

        Booking updatedBooking = bookingRepository.save(booking);
        return convertToResponse(updatedBooking);
    }

    public List<BookingResponse> getUserBookings(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }

        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));
        return convertToResponse(booking);
    }

    private BookingResponse convertToResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getUser().getId(),
                booking.getUser().getName(),
                booking.getParkingSlot().getId(),
                booking.getParkingSlot().getSlotNumber(),
                booking.getParkingSlot().getVehicleType(),
                booking.getParkingSlot().getFloor(),
                booking.getVehicleNumber(),
                booking.getBookingDate(),
                booking.getStartTime(),
                booking.getEndTime(),
                booking.getStatus(),
                booking.getCreatedAt()
        );
    }
}
