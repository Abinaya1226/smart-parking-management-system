import React from 'react';
import { Calendar, Clock, Car, MapPin, XCircle, CheckCircle } from 'lucide-react';

const BookingCard = ({ booking, onCancel }) => {
  const isActive = booking.status === 'ACTIVE';

  return (
    <div className="glass-card" style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f8fafc' }}>
              Booking #{booking.id}
            </span>
            <span className={`slot-status-badge ${booking.status}`} style={{ margin: 0 }}>
              {booking.status}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <span className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>Slot Number</span>
              <p style={{ fontWeight: '700', fontSize: '1.1rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={16} /> Slot {booking.slotNumber} ({booking.floor})
              </p>
            </div>

            <div>
              <span className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>Vehicle Details</span>
              <p style={{ fontWeight: '600', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Car size={16} /> {booking.vehicleNumber} ({booking.vehicleType})
              </p>
            </div>

            <div>
              <span className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>Date</span>
              <p style={{ fontWeight: '500', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={16} /> {booking.bookingDate}
              </p>
            </div>

            <div>
              <span className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>Time Duration</span>
              <p style={{ fontWeight: '500', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={16} /> {booking.startTime} - {booking.endTime}
              </p>
            </div>
          </div>
        </div>

        {isActive && onCancel && (
          <button onClick={() => onCancel(booking.id)} className="btn btn-danger btn-sm">
            <XCircle size={16} /> Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
