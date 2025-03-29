import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/adminAuth.css';

const AdminLogin = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/admin/login',
        formData
      );
      
      // Store token and handle navigation
      localStorage.setItem('adminToken', response.data.token);
      setIsAuthenticated(true);
      navigate('/dashboard');
      
    } catch (error) {
      // Improved error handling
      const errorMessage = error.response?.data?.message;
      setMessage(
        errorMessage === 'Invalid credentials' 
          ? 'Invalid email or password' 
          : errorMessage || 'Login failed'
      );
    }
  };

  return (
    <div className="admin-auth-container">
      <h2>Admin Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default AdminLogin;