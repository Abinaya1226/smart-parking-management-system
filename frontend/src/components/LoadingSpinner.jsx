import React from 'react';

const LoadingSpinner = ({ message = 'Loading data...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p style={{ fontWeight: '500' }}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
