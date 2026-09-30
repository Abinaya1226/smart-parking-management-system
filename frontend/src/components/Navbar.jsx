import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, LayoutDashboard, Calendar, Users, LogOut, LogIn, UserPlus, Grid } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Car size={28} className="text-blue-500" style={{ color: '#3b82f6' }} />
          <span>Smart<span className="gradient-text">Park</span></span>
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/slots" className={`nav-link ${isActive('/slots')}`}>
              <Grid size={18} /> Slots
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <>
                  <li>
                    <Link to="/admin/dashboard" className={`nav-link ${isActive('/admin/dashboard')}`}>
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/slots" className={`nav-link ${isActive('/admin/slots')}`}>
                      Manage Slots
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/bookings" className={`nav-link ${isActive('/admin/bookings')}`}>
                      Manage Bookings
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/users" className={`nav-link ${isActive('/admin/users')}`}>
                      <Users size={18} /> Users
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookings" className={`nav-link ${isActive('/bookings')}`}>
                      <Calendar size={18} /> My Bookings
                    </Link>
                  </li>
                </>
              )}

              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="nav-user-badge">
                  {user.name} ({user.role})
                </span>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  <LogIn size={16} /> User Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary btn-sm">
                  <UserPlus size={16} /> Register
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="nav-link" style={{ fontSize: '0.85rem' }}>
                  Admin Area
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
