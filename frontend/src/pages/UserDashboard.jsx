import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { parkingSlotService, bookingService } from '../services/api';
import DashboardCard from '../components/DashboardCard';
import BookingCard from '../components/BookingCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Grid, CheckCircle2, Lock, ShieldAlert, PlusCircle, History, Calendar } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [slotStats, setSlotStats] = useState({
    total: 0,
    available: 0,
    booked: 0,
    occupied: 0,
  });
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const [slotsRes, bookingsRes] = await Promise.all([
        parkingSlotService.getAllSlots(),
        bookingService.getUserBookings(user.id),
      ]);

      const slots = slotsRes.data;
      setSlotStats({
        total: slots.length,
        available: slots.filter(s => s.status === 'AVAILABLE').length,
        booked: slots.filter(s => s.status === 'BOOKED').length,
        occupied: slots.filter(s => s.status === 'OCCUPIED').length,
      });

      setUserBookings(bookingsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.cancelBooking(bookingId);
        fetchData(); // Refresh data
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to cancel booking.');
      }
    }
  };

  const activeBooking = userBookings.find(b => b.status === 'ACTIVE');

  if (loading) return <LoadingSpinner message="Loading user dashboard..." />;

  return (
    <div>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Welcome back, <span className="gradient-text">{user.name}</span>!</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Vehicle: <strong>{user.vehicleNumber}</strong></p>
        </div>
        <Link to="/slots" className="btn btn-primary">
          <PlusCircle size={18} /> Book New Parking Slot
        </Link>
      </div>

      <ErrorMessage message={error} onRetry={fetchData} />

      {/* Statistics Grid */}
      <div className="stats-grid">
        <DashboardCard title="Total Slots" value={slotStats.total} icon={Grid} type="total" />
        <DashboardCard title="Available Slots" value={slotStats.available} icon={CheckCircle2} type="available" />
        <DashboardCard title="Booked Slots" value={slotStats.booked} icon={Lock} type="booked" />
        <DashboardCard title="Occupied Slots" value={slotStats.occupied} icon={ShieldAlert} type="occupied" />
      </div>

      {/* Current Active Booking Banner */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={22} style={{ color: '#3b82f6' }} /> Active Booking Status
        </h2>
        {activeBooking ? (
          <BookingCard booking={activeBooking} onCancel={handleCancelBooking} />
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>You currently have no active parking bookings.</p>
            <Link to="/slots" className="btn btn-primary btn-sm">
              Explore & Reserve Slot Now
            </Link>
          </div>
        )}
      </div>

      {/* Booking History Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={22} style={{ color: '#8b5cf6' }} /> Recent Booking History
          </h2>
          {userBookings.length > 0 && (
            <Link to="/bookings" className="btn btn-secondary btn-sm">
              View Full History
            </Link>
          )}
        </div>

        {userBookings.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', color: '#94a3b8' }}>
            No previous booking history found.
          </div>
        ) : (
          userBookings.slice(0, 3).map(booking => (
            <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
