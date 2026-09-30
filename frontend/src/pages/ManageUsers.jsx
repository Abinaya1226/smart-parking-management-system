import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Users, Mail, Phone, Car, Shield } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getAllUsers();
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <LoadingSpinner message="Fetching user directory..." />;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={28} style={{ color: '#10b981' }} /> Registered User Directory
        </h1>
        <p style={{ color: '#94a3b8' }}>View all customer accounts and administrator credentials registered in the system.</p>
      </div>

      <ErrorMessage message={error} onRetry={fetchUsers} />

      {/* Users Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Default Vehicle</th>
              <th>Account Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>#{u.id}</td>
                <td style={{ fontWeight: '700', color: '#f8fafc' }}>{u.name}</td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Mail size={14} style={{ color: '#94a3b8' }} /> {u.email}
                  </span>
                </td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Phone size={14} style={{ color: '#94a3b8' }} /> {u.phone}
                  </span>
                </td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Car size={14} style={{ color: '#60a5fa' }} /> {u.vehicleNumber}
                  </span>
                </td>
                <td>
                  <span
                    className="nav-user-badge"
                    style={u.role === 'ADMIN' ? { background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', borderColor: 'rgba(139, 92, 246, 0.4)' } : {}}
                  >
                    {u.role === 'ADMIN' && <Shield size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
