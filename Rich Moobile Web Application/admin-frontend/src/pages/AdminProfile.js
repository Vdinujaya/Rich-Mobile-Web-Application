import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/adminAuth.css';

const AdminProfile = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:4000/api/admin/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Set only relevant fields, exclude password
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone,
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        setMessage('Failed to load profile');
        console.error('Profile error:', error);
      }
    };
    fetchAdminData();
  }, []);
  
  // Update handleUpdate to clear password fields on success
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(
        'http://localhost:4000/api/admin/me', 
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete('http://localhost:4000/api/admin/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        navigate('/admin/login');
      } catch (error) {
        setMessage('Account deletion failed');
      }
    }
  };

  // Update handleLogout
const handleLogout = () => {
  localStorage.removeItem('adminToken');
  setIsAuthenticated(false);
  // Force full page reload to clear any cached state
  window.location.href = '/admin/login';
};

  return (
    <div className="admin-auth-container">
      <h2>Manage Account</h2>
      <form className="auth-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-save">
            Update Profile
          </button>
          <button 
            type="button" 
            className="btn-logout" 
            onClick={handleLogout}
          >
            Logout
          </button>
          <button type="button" className="btn-danger" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default AdminProfile;