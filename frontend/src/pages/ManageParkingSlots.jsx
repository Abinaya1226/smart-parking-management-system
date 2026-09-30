import React, { useEffect, useState } from 'react';
import { parkingSlotService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Plus, Edit2, Trash2, CheckCircle2, Lock, ShieldAlert, X } from 'lucide-react';

const ManageParkingSlots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state for Add/Edit
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [formData, setFormData] = useState({
    slotNumber: '',
    vehicleType: 'Car',
    status: 'AVAILABLE',
    floor: 'Ground Floor',
  });

  const fetchSlots = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await parkingSlotService.getAllSlots();
      setSlots(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch parking slots.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleOpenAddModal = () => {
    setEditingSlot(null);
    setFormData({
      slotNumber: '',
      vehicleType: 'Car',
      status: 'AVAILABLE',
      floor: 'Ground Floor',
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (slot) => {
    setEditingSlot(slot);
    setFormData({
      slotNumber: slot.slotNumber,
      vehicleType: slot.vehicleType,
      status: slot.status,
      floor: slot.floor,
    });
    setShowModal(true);
  };

  const handleDeleteSlot = async (id, slotNumber) => {
    if (window.confirm(`Are you sure you want to delete slot ${slotNumber}?`)) {
      try {
        await parkingSlotService.deleteSlot(id);
        fetchSlots();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete parking slot.');
      }
    }
  };

  const handleStatusQuickChange = async (id, newStatus) => {
    try {
      await parkingSlotService.updateSlotStatus(id, newStatus);
      fetchSlots();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSlot) {
        await parkingSlotService.updateSlot(editingSlot.id, formData);
      } else {
        await parkingSlotService.createSlot(formData);
      }
      setShowModal(false);
      fetchSlots();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save parking slot.');
    }
  };

  if (loading) return <LoadingSpinner message="Loading parking slots..." />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Manage Parking Slots</h1>
          <p style={{ color: '#94a3b8' }}>Add new slots, edit vehicle types, or override status states.</p>
        </div>

        <button onClick={handleOpenAddModal} className="btn btn-primary">
          <Plus size={18} /> Add New Parking Slot
        </button>
      </div>

      <ErrorMessage message={error} onRetry={fetchSlots} />

      {/* Table of Parking Slots */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Slot Number</th>
              <th>Vehicle Type</th>
              <th>Floor Location</th>
              <th>Current Status</th>
              <th>Quick Status Override</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id}>
                <td>#{slot.id}</td>
                <td style={{ fontWeight: '700', fontSize: '1.1rem', color: '#60a5fa' }}>{slot.slotNumber}</td>
                <td>{slot.vehicleType}</td>
                <td>{slot.floor}</td>
                <td>
                  <span className={`slot-status-badge ${slot.status}`}>
                    {slot.status}
                  </span>
                </td>
                <td>
                  <select
                    value={slot.status}
                    onChange={(e) => handleStatusQuickChange(slot.id, e.target.value)}
                    className="form-control"
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', width: 'auto' }}
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="BOOKED">BOOKED</option>
                    <option value="OCCUPIED">OCCUPIED</option>
                  </select>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenEditModal(slot)} className="btn btn-secondary btn-sm" title="Edit Slot">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDeleteSlot(slot.id, slot.slotNumber)} className="btn btn-danger btn-sm" title="Delete Slot">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Slot Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem' }}>
                {editingSlot ? `Edit Slot ${editingSlot.slotNumber}` : 'Add New Parking Slot'}
              </h3>
              <button onClick={() => setShowModal(false)} className="btn btn-secondary btn-sm" style={{ padding: '0.25rem 0.5rem' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Slot Number (e.g. D1)</label>
                <input
                  type="text"
                  value={formData.slotNumber}
                  onChange={(e) => setFormData({ ...formData, slotNumber: e.target.value })}
                  placeholder="e.g. A7"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Vehicle Type</label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="form-control"
                >
                  <option value="Car">Car</option>
                  <option value="SUV">SUV</option>
                  <option value="Bike">Bike</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Floor Location</label>
                <select
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="form-control"
                >
                  <option value="Ground Floor">Ground Floor</option>
                  <option value="First Floor">First Floor</option>
                  <option value="Second Floor">Second Floor</option>
                  <option value="Basement 1">Basement 1</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Slot Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-control"
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="BOOKED">BOOKED</option>
                  <option value="OCCUPIED">OCCUPIED</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingSlot ? 'Update Slot' : 'Create Slot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageParkingSlots;
