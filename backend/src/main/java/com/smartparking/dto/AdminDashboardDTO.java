package com.smartparking.dto;

public class AdminDashboardDTO {

    private long totalSlots;
    private long availableSlots;
    private long bookedSlots;
    private long occupiedSlots;
    private long totalUsers;
    private long totalBookings;
    private long activeBookings;

    public AdminDashboardDTO() {
    }

    public AdminDashboardDTO(long totalSlots, long availableSlots, long bookedSlots, long occupiedSlots, long totalUsers, long totalBookings, long activeBookings) {
        this.totalSlots = totalSlots;
        this.availableSlots = availableSlots;
        this.bookedSlots = bookedSlots;
        this.occupiedSlots = occupiedSlots;
        this.totalUsers = totalUsers;
        this.totalBookings = totalBookings;
        this.activeBookings = activeBookings;
    }

    public long getTotalSlots() {
        return totalSlots;
    }

    public void setTotalSlots(long totalSlots) {
        this.totalSlots = totalSlots;
    }

    public long getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(long availableSlots) {
        this.availableSlots = availableSlots;
    }

    public long getBookedSlots() {
        return bookedSlots;
    }

    public void setBookedSlots(long bookedSlots) {
        this.bookedSlots = bookedSlots;
    }

    public long getOccupiedSlots() {
        return occupiedSlots;
    }

    public void setOccupiedSlots(long occupiedSlots) {
        this.occupiedSlots = occupiedSlots;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public long getActiveBookings() {
        return activeBookings;
    }

    public void setActiveBookings(long activeBookings) {
        this.activeBookings = activeBookings;
    }
}
