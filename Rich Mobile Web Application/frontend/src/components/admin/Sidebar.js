import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiActivity, FiPackage, FiUsers, FiSettings, FiShoppingCart } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <nav className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin" end>
            <FiActivity /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products">
            <FiPackage /> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders">
            <FiShoppingCart /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">
            <FiUsers /> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/settings">
            <FiSettings /> Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;