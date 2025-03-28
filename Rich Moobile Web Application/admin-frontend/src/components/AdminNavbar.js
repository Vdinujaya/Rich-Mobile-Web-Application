import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPackage, FiShoppingCart, FiUsers, FiSettings, FiBox, FiUser, FiGrid } from 'react-icons/fi';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="admin-nav-links">
          <NavLink to="/dashboard" className="admin-nav-link">
            <FiGrid /> dashboard
          </NavLink>
          <NavLink to="/products" className="admin-nav-link">
            <FiPackage /> Products
          </NavLink>
          <NavLink to="/orders" className="admin-nav-link">
            <FiShoppingCart /> Orders
          </NavLink>
          <NavLink to="/inventory" className="admin-nav-link">
            <FiBox /> Inventory
          </NavLink>
          <NavLink to="/users" className="admin-nav-link">
            <FiUsers /> Users
          </NavLink>
          <NavLink to="/settings" className="admin-nav-link">
            <FiSettings /> Settings
          </NavLink>
          <NavLink to="/admin/profile" className="admin-nav-link">
            <FiUser /> Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;