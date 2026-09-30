import React from 'react';
import { Car, Bike, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

const ParkingSlotCard = ({ slot, onSelect }) => {
  const isAvailable = slot.status === 'AVAILABLE';

  const getVehicleIcon = (type) => {
    switch (type?.toUpperCase()) {
      case 'BIKE':
        return <Bike size={18} />;
      case 'SUV':
      case 'CAR':
      default:
        return <Car size={18} />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return <CheckCircle2 size={14} />;
      case 'BOOKED':
        return <Lock size={14} />;
      case 'OCCUPIED':
      default:
        return <ShieldAlert size={14} />;
    }
  };

  return (
    <div className={`parking-slot-card ${slot.status}`}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="slot-vehicle-type" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {getVehicleIcon(slot.vehicleType)} {slot.vehicleType}
          </span>
          <span className="slot-floor">{slot.floor}</span>
        </div>
        <div className="slot-number">{slot.slotNumber}</div>
      </div>

      <div>
        <div className={`slot-status-badge ${slot.status}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          {getStatusIcon(slot.status)} {slot.status}
        </div>

        {isAvailable && onSelect && (
          <button
            onClick={() => onSelect(slot)}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', marginTop: '0.75rem' }}
          >
            Select Slot
          </button>
        )}
      </div>
    </div>
  );
};

export default ParkingSlotCard;
