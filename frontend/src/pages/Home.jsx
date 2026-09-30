import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, ShieldCheck, Clock, Zap, ArrowRight, Grid } from 'lucide-react';
import { parkingSlotService } from '../services/api';
import ParkingSlotCard from '../components/ParkingSlotCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    parkingSlotService.getAllSlots()
      .then(res => {
        setSlots(res.data.slice(0, 6)); // Preview first 6 slots
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSelectSlot = (slot) => {
    navigate('/book-parking', { state: { slot } });
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '4rem 1rem 3rem 1rem' }}>
        <div className="gradient-text" style={{ fontSize: '0.95rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Smart City Mobility
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.15' }}>
          Smart Parking Management System
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
          Find, Book and Manage Your Parking Easily
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/slots" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
            <Grid size={20} /> View Parking Slots
          </Link>
          <Link to="/login" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
            User Login
          </Link>
          <Link to="/register" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
            Register Now
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', margin: '3rem 0' }}>
        <div className="glass-card">
          <div className="stat-icon total" style={{ marginBottom: '1rem' }}>
            <Zap size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Real-time Slot Availability</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Instantly view which parking slots are Available, Booked, or Occupied across all floors.
          </p>
        </div>

        <div className="glass-card">
          <div className="stat-icon available" style={{ marginBottom: '1rem' }}>
            <Clock size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Instant Advance Booking</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Select your preferred slot, choose date and duration, and secure your spot in seconds.
          </p>
        </div>

        <div className="glass-card">
          <div className="stat-icon booked" style={{ marginBottom: '1rem' }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Easy Booking Management</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            View live booking receipts, check history, and easily cancel active reservations anytime.
          </p>
        </div>
      </section>

      {/* Live Slot Preview */}
      <section className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem' }}>Live Parking Overview</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Real-time status of available slots</p>
          </div>
          <Link to="/slots" className="btn btn-secondary btn-sm">
            View All Slots <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching parking slots..." />
        ) : (
          <div className="slot-grid">
            {slots.map(slot => (
              <ParkingSlotCard key={slot.id} slot={slot} onSelect={handleSelectSlot} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
