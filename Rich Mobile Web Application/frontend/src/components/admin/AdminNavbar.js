import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPackage, FiShoppingCart, FiUsers, FiSettings, FiBox } from 'react-icons/fi';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="admin-nav-links">
          <NavLink to="/admin/products" className="admin-nav-link">
            <FiPackage /> Products
          </NavLink>
          <NavLink to="/admin/orders" className="admin-nav-link">
            <FiShoppingCart /> Orders
          </NavLink>
          <NavLink to="/admin/inventory" className="admin-nav-link">
            <FiBox /> Inventory
          </NavLink>
          <NavLink to="/admin/users" className="admin-nav-link">
            <FiUsers /> Users
          </NavLink>
          <NavLink to="/admin/settings" className="admin-nav-link">
            <FiSettings /> Settings
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;