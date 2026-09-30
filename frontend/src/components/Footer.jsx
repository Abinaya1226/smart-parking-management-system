import React from 'react';
import { Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#f8fafc' }}>
          <Car size={20} style={{ color: '#3b82f6' }} />
          Smart Parking Management System
        </div>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
          Full-Stack Web Project | Built with React, Spring Boot, Java 21, and MySQL
        </p>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} SmartPark. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
