import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parkingSlotService } from '../services/api';
import ParkingSlotCard from '../components/ParkingSlotCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Grid, Filter, CheckCircle2, Lock, ShieldAlert } from 'lucide-react';

const ParkingSlots = () => {
  const [slots, setSlots] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [floorFilter, setFloorFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSlots = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await parkingSlotService.getAllSlots();
      setSlots(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load parking slots.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleSelectSlot = (slot) => {
    navigate('/book-parking', { state: { slot } });
  };

  const filteredSlots = slots.filter(slot => {
    const matchesStatus = statusFilter === 'ALL' || slot.status === statusFilter;
    const matchesFloor = floorFilter === 'ALL' || slot.floor === floorFilter;
    return matchesStatus && matchesFloor;
  });

  const availableCount = slots.filter(s => s.status === 'AVAILABLE').length;
  const bookedCount = slots.filter(s => s.status === 'BOOKED').length;
  const occupiedCount = slots.filter(s => s.status === 'OCCUPIED').length;

  if (loading) return <LoadingSpinner message="Fetching parking slots..." />;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Parking Slots Layout</h1>
        <p style={{ color: '#94a3b8' }}>Browse live parking slots. Click on any <strong>AVAILABLE</strong> slot to proceed with booking.</p>
      </div>

      <ErrorMessage message={error} onRetry={fetchSlots} />

      {/* Filter Toolbar */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Status Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`btn btn-sm ${statusFilter === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All Slots ({slots.length})
            </button>
            <button
              onClick={() => setStatusFilter('AVAILABLE')}
              className={`btn btn-sm ${statusFilter === 'AVAILABLE' ? 'btn-primary' : 'btn-secondary'}`}
              style={statusFilter === 'AVAILABLE' ? { background: '#10b981', borderColor: '#10b981' } : {}}
            >
              <CheckCircle2 size={14} /> Available ({availableCount})
            </button>
            <button
              onClick={() => setStatusFilter('BOOKED')}
              className={`btn btn-sm ${statusFilter === 'BOOKED' ? 'btn-primary' : 'btn-secondary'}`}
              style={statusFilter === 'BOOKED' ? { background: '#f59e0b', borderColor: '#f59e0b' } : {}}
            >
              <Lock size={14} /> Booked ({bookedCount})
            </button>
            <button
              onClick={() => setStatusFilter('OCCUPIED')}
              className={`btn btn-sm ${statusFilter === 'OCCUPIED' ? 'btn-primary' : 'btn-secondary'}`}
              style={statusFilter === 'OCCUPIED' ? { background: '#ef4444', borderColor: '#ef4444' } : {}}
            >
              <ShieldAlert size={14} /> Occupied ({occupiedCount})
            </button>
          </div>

          {/* Floor Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} style={{ color: '#94a3b8' }} />
            <select
              value={floorFilter}
              onChange={(e) => setFloorFilter(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              <option value="ALL">All Floors</option>
              <option value="Ground Floor">Ground Floor</option>
              <option value="First Floor">First Floor</option>
              <option value="Second Floor">Second Floor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Display */}
      {filteredSlots.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          No parking slots match the selected criteria.
        </div>
      ) : (
        <div className="slot-grid">
          {filteredSlots.map(slot => (
            <ParkingSlotCard key={slot.id} slot={slot} onSelect={handleSelectSlot} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ParkingSlots;
