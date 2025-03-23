import React, { useState } from 'react';
import { FiMail, FiSave, FiLock, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import '../styles/settings.css';

const Settings = ({ setIsAuthenticated }) => {  // Receive setIsAuthenticated prop
  const [storeName, setStoreName] = useState('Mobile Shop');
  const [storeEmail, setStoreEmail] = useState('support@mobileshop.com');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);  // Update parent state
    navigate('/admin/login');
  };

  return (
    <div className="admin-content">
      <AdminNavbar />
      <div className="admin-header">
        <h2>Store Settings</h2>
      </div>

      <div className="settings-form">
        <div className="form-group">
          <label><FiShoppingBag /> Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><FiMail /> Store Email</label>
          <input
            type="email"
            value={storeEmail}
            onChange={(e) => setStoreEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><FiLock /> Maintenance Mode</label>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
            />
            <span className="slider"></span>
          </div>
        </div>

        <button className="btn-save">
          <FiSave /> Save Changes
        </button>
      </div>

        <div className="form-buttons">
          <button className="btn-save">
            <FiSave /> Save Changes
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
  );
};

export default Settings;