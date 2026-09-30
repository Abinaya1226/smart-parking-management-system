import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Car, MapPin, ArrowRight, Printer } from 'lucide-react';

const BookingConfirmation = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="glass-card" style={{ maxWidth: '500px', margin: '3rem auto', textAlign: 'center' }}>
        <h2>No Booking Found</h2>
        <p style={{ color: '#94a3b8', margin: '1rem 0' }}>It looks like you haven't completed a booking session.</p>
        <Link to="/dashboard" className="btn btn-primary">Return to Dashboard</Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="glass-card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', color: '#10b981', marginBottom: '1.25rem' }}>
          <CheckCircle size={48} />
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Booking Confirmed!</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Your parking slot has been successfully reserved.</p>

        {/* Ticket Card */}
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px dashed var(--border-color)', borderRadius: '16px', padding: '1.75rem', textAlign: 'left', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>RESERVATION ID</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#60a5fa' }}>#{booking.id}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>STATUS</span>
              <div>
                <span className={`slot-status-badge ${booking.status}`}>{booking.status}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <span className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>User Name</span>
              <p style={{ fontWeight: '600', color: '#f8fafc' }}>{booking.userName}</p>
            </div>

            <div>
              <span className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>Vehicle Number</span>
              <p style={{ fontWeight: '600', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Car size={16} /> {booking.vehicleNumber}
              </p>
            </div>

            <div>
              <span className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>Slot & Floor</span>
              <p style={{ fontWeight: '700', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={16} /> Slot {booking.slotNumber} ({booking.floor})
              </p>
            </div>

            <div>
              <span className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>Vehicle Type</span>
              <p style={{ fontWeight: '500', color: '#94a3b8' }}>{booking.vehicleType}</p>
            </div>

            <div>
              <span className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>Booking Date</span>
              <p style={{ fontWeight: '500', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={16} /> {booking.bookingDate}
              </p>
            </div>

            <div>
              <span className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>Reserved Time</span>
              <p style={{ fontWeight: '500', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={16} /> {booking.startTime} - {booking.endTime}
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn btn-secondary">
            <Printer size={18} /> Print Receipt
          </button>
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
