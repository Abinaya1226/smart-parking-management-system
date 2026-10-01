import axios from 'axios';

const API_BASE_URL = 'https://smart-parking-management-system-production-7d73.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication Services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Parking Slot Services
export const parkingSlotService = {
  getAllSlots: () => api.get('/parking-slots'),
  getAvailableSlots: () => api.get('/parking-slots/available'),
  getSlotById: (id) => api.get(`/parking-slots/${id}`),
  createSlot: (data) => api.post('/parking-slots', data),
  updateSlot: (id, data) => api.put(`/parking-slots/${id}`, data),
  updateSlotStatus: (id, status) => api.put(`/parking-slots/${id}/status?status=${status}`),
  deleteSlot: (id) => api.delete(`/parking-slots/${id}`),
};

// Booking Services
export const bookingService = {
  createBooking: (data) => api.post('/bookings', data),
  getUserBookings: (userId) => api.get(`/bookings/user/${userId}`),
  getAllBookings: () => api.get('/bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
};

// Admin Services
export const adminService = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getAllUsers: () => api.get('/admin/users'),
};

export default api;
