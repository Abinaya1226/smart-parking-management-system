import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/api';
import BookingCard from '../components/BookingCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { History, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingHistory = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await bookingService.getUserBookings(user.id);
      setBookings(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load booking history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchBookings();
    }
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.cancelBooking(bookingId);
        fetchBookings();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to cancel booking.');
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading your bookings..." />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={28} style={{ color: '#3b82f6' }} /> My Booking History
          </h1>
          <p style={{ color: '#94a3b8' }}>View and manage all your active and past parking reservations.</p>
        </div>

        <Link to="/slots" className="btn btn-primary">
          <PlusCircle size={18} /> Book New Slot
        </Link>
      </div>

      <ErrorMessage message={error} onRetry={fetchBookings} />

      {bookings.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          <p style={{ marginBottom: '1rem' }}>You have no parking reservations yet.</p>
          <Link to="/slots" className="btn btn-primary btn-sm">
            Book Your First Slot
          </Link>
        </div>
      ) : (
        bookings.map(b => (
          <BookingCard key={b.id} booking={b} onCancel={handleCancelBooking} />
        ))
      )}
    </div>
  );
};

export default BookingHistory;
