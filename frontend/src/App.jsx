import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import ParkingSlots from './pages/ParkingSlots';
import BookParking from './pages/BookParking';
import BookingConfirmation from './pages/BookingConfirmation';
import BookingHistory from './pages/BookingHistory';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageParkingSlots from './pages/ManageParkingSlots';
import ManageBookings from './pages/ManageBookings';
import ManageUsers from './pages/ManageUsers';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/slots" element={<ParkingSlots />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* User Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              <Route path="/book-parking" element={<ProtectedRoute><BookParking /></ProtectedRoute>} />
              <Route path="/booking-confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
              <Route path="/bookings" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />

              {/* Admin Protected Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/slots" element={<ProtectedRoute adminOnly><ManageParkingSlots /></ProtectedRoute>} />
              <Route path="/admin/bookings" element={<ProtectedRoute adminOnly><ManageBookings /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute adminOnly><ManageUsers /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
