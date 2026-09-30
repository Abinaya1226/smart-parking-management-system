import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService, parkingSlotService } from '../services/api';
import ErrorMessage from '../components/ErrorMessage';
import { Calendar, Clock, Car, MapPin, CheckCircle } from 'lucide-react';

const BookParking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [slot, setSlot] = useState(location.state?.slot || null);
  const [allAvailableSlots, setAllAvailableSlots] = useState([]);
  const [formData, setFormData] = useState({
    vehicleNumber: user?.vehicleNumber || '',
    bookingDate: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '12:00',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slot) {
      parkingSlotService.getAvailableSlots()
        .then(res => {
          setAllAvailableSlots(res.data);
          if (res.data.length > 0) {
            setSlot(res.data[0]);
          }
        })
        .catch(err => console.error(err));
    }
  }, [slot]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!slot) {
      setError('Please select an available parking slot.');
      return;
    }

    if (!formData.vehicleNumber || !formData.bookingDate || !formData.startTime || !formData.endTime) {
      setError('Please fill in all booking details.');
      return;
    }

    if (formData.startTime >= formData.endTime) {
      setError('Start time must be strictly before end time.');
      return;
    }

    try {
      setLoading(true);
      const bookingPayload = {
        userId: user.id,
        parkingSlotId: slot.id,
        vehicleNumber: formData.vehicleNumber,
        bookingDate: formData.bookingDate,
        startTime: formData.startTime.length === 5 ? `${formData.startTime}:00` : formData.startTime,
        endTime: formData.endTime.length === 5 ? `${formData.endTime}:00` : formData.endTime,
      };

      const res = await bookingService.createBooking(bookingPayload);
      navigate('/booking-confirmation', { state: { booking: res.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking. Slot may no longer be available.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '580px' }}>
      <div className="glass-card" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.85rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '50%', color: '#10b981', marginBottom: '1rem' }}>
            <Car size={32} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Book Parking Slot</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Fill in your reservation details below</p>
        </div>

        <ErrorMessage message={error} />

        {slot ? (
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>SELECTED SLOT</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#60a5fa' }}>Slot {slot.slotNumber}</div>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{slot.vehicleType} • {slot.floor}</span>
            </div>
            <div className={`slot-status-badge ${slot.status}`}>
              {slot.status}
            </div>
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">Select Available Slot</label>
            <select
              onChange={(e) => {
                const found = allAvailableSlots.find(s => s.id === parseInt(e.target.value));
                setSlot(found);
              }}
              className="form-control"
            >
              {allAvailableSlots.map(s => (
                <option key={s.id} value={s.id}>
                  Slot {s.slotNumber} ({s.vehicleType} - {s.floor})
                </option>
              ))}
            </select>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Car size={16} /> Vehicle Registration Number
            </label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="e.g. KA-01-AB-1234"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={16} /> Booking Date
            </label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="form-control"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={16} /> Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={16} /> End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Processing Reservation...' : <><CheckCircle size={18} /> Confirm & Reserve Slot</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookParking;
