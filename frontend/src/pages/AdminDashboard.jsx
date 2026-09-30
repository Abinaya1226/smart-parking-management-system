import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../services/api';
import DashboardCard from '../components/DashboardCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Grid, CheckCircle2, Lock, ShieldAlert, Users, Calendar, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getDashboardStats();
      setStats(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admin statistics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner message="Loading admin control panel..." />;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Admin Dashboard & Control Center
        </h1>
        <p style={{ color: '#94a3b8' }}>Real-time overview of system occupancy, user activity, and slot management.</p>
      </div>

      <ErrorMessage message={error} onRetry={fetchStats} />

      {/* Main Statistics Cards */}
      <div className="stats-grid">
        <DashboardCard title="Total Parking Slots" value={stats?.totalSlots || 0} icon={Grid} type="total" />
        <DashboardCard title="Available Slots" value={stats?.availableSlots || 0} icon={CheckCircle2} type="available" />
        <DashboardCard title="Booked Slots" value={stats?.bookedSlots || 0} icon={Lock} type="booked" />
        <DashboardCard title="Occupied Slots" value={stats?.occupiedSlots || 0} icon={ShieldAlert} type="occupied" />
      </div>

      {/* Secondary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div className="stat-icon total" style={{ width: '56px', height: '56px', background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa' }}>
            <Users size={28} />
          </div>
          <div>
            <div style={{ fontSize: '1.85rem', fontWeight: '800' }}>{stats?.totalUsers || 0}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Registered System Users</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div className="stat-icon total" style={{ width: '56px', height: '56px', background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6' }}>
            <Calendar size={28} />
          </div>
          <div>
            <div style={{ fontSize: '1.85rem', fontWeight: '800' }}>{stats?.totalBookings || 0}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total System Bookings ({stats?.activeBookings || 0} Active)</div>
          </div>
        </div>
      </div>

      {/* Quick Admin Actions */}
      <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Administrative Management Controls</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Grid size={20} style={{ color: '#3b82f6' }} /> Parking Slots Management
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Add new parking slots, update existing slot details, or manually override slot status.
          </p>
          <Link to="/admin/slots" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
            Manage Parking Slots
          </Link>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} style={{ color: '#f59e0b' }} /> Bookings Oversight
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Monitor all user reservations in real-time, search by vehicle/slot, or process cancellations.
          </p>
          <Link to="/admin/bookings" className="btn btn-primary btn-sm" style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
            View & Manage All Bookings
          </Link>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={20} style={{ color: '#10b981' }} /> User Directory
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Inspect registered customer profiles, emails, contact numbers, and vehicle records.
          </p>
          <Link to="/admin/users" className="btn btn-primary btn-sm" style={{ width: '100%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            View Registered Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
