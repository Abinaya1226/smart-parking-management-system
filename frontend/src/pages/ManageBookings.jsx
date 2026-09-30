import React, { useEffect, useState } from 'react';
import { bookingService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Calendar, Search, XCircle, Car, MapPin, User } from 'lucide-react';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await bookingService.getAllBookings();
      setBookings(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    if (window.confirm(`Are you sure you want to cancel booking #${id}?`)) {
      try {
        await bookingService.cancelBooking(id);
        fetchBookings();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to cancel booking.');
      }
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const query = searchQuery.toLowerCase();
    return (
      b.userName?.toLowerCase().includes(query) ||
      b.slotNumber?.toLowerCase().includes(query) ||
      b.vehicleNumber?.toLowerCase().includes(query) ||
      b.id?.toString().includes(query)
    );
  });

  if (loading) return <LoadingSpinner message="Fetching system bookings..." />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={28} style={{ color: '#f59e0b' }} /> Manage System Bookings
          </h1>
          <p style={{ color: '#94a3b8' }}>Monitor customer parking reservations and manage status transitions.</p>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search by User, Slot, Vehicle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      <ErrorMessage message={error} onRetry={fetchBookings} />

      {/* Bookings Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Vehicle Number</th>
              <th>Reserved Slot</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                  No bookings found matching "{searchQuery}".
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td style={{ fontWeight: '600' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <User size={14} style={{ color: '#94a3b8' }} /> {b.userName}
                    </span>
                  </td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Car size={14} style={{ color: '#60a5fa' }} /> {b.vehicleNumber}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700', color: '#60a5fa' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} /> Slot {b.slotNumber} ({b.floor})
                    </span>
                  </td>
                  <td>
                    <div>{b.bookingDate}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{b.startTime} - {b.endTime}</div>
                  </td>
                  <td>
                    <span className={`slot-status-badge ${b.status}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    {b.status === 'ACTIVE' && (
                      <button onClick={() => handleCancelBooking(b.id)} className="btn btn-danger btn-sm">
                        <XCircle size={14} /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
