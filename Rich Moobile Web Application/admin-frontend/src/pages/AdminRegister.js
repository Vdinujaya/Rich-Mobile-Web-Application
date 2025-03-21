import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/adminAuth.css';

const AdminRegister = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [phoneError, setPhoneError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Invalid phone number format (10 digits required)');
      return false;
    }
    setPhoneError('');
    return true;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:4000/api/admin/register',
        {
          ...formData,
          phone: formData.phone.replace(/\D/g, '') // Clean phone number
        }
      );
      
      // Handle successful registration
      localStorage.setItem('adminToken', response.data.token);
      setIsAuthenticated(true);
      navigate('/dashboard');
  
    } catch (error) {
      // Enhanced error messages
      const errorMessage = error.response?.data?.message;
      setMessage(
        errorMessage?.includes('duplicate') 
          ? 'Email or username already exists' 
          : errorMessage || 'Registration failed'
      );
    }
  };

  return (
    <div className="admin-auth-container">
      <h2>Admin Registration</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => {
          handleChange(e);
          validatePhone(e.target.value);
          }}
          pattern="[0-9]{10}"
          required
        />
        {phoneError && <span className="input-error">{phoneError}</span>}
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>

      <div className="auth-switch">
        <p>Already have an account? <a href="/admin/login">Login here</a></p>
      </div>
      
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default AdminRegister;