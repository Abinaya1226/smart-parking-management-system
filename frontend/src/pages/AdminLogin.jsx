import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import ErrorMessage from '../components/ErrorMessage';
import { ShieldCheck, Mail, Lock, LogIn } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: 'admin@smartparking.com', password: 'admin123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const res = await authService.login(formData);

      if (res.data.role !== 'ADMIN') {
        setError('Access denied. This login portal is for Administrators only.');
        return;
      }

      login(res.data);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="glass-card" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.85rem', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '50%', color: '#8b5cf6', marginBottom: '1rem' }}>
            <ShieldCheck size={36} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Admin Portal</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>System Management & Monitoring Login</p>
        </div>

        <ErrorMessage message={error} />

        <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          <strong style={{ color: '#60a5fa' }}>Demo Credentials:</strong><br/>
          Email: <code>admin@smartparking.com</code><br/>
          Password: <code>admin123</code>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={16} /> Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@smartparking.com"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Lock size={16} /> Admin Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }} disabled={loading}>
            {loading ? 'Authenticating...' : <><LogIn size={18} /> Access Admin Dashboard</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
