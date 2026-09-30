import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, type = 'total' }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>
        <Icon size={24} />
      </div>
      <div className="stat-info">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
