import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPackage, FiShoppingCart, FiUsers, FiBox, FiDollarSign, FiUser } from 'react-icons/fi';
import '../styles/Dashboard.css';

const AdminNavbar = ({ adminData }) => {
  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="admin-dashboard-grid">
          {/* Products Card */}
          <NavLink to="/products" className="dashboard-card products-card">
            <div className="card-content">
              <div className="card-icon">
                <FiPackage size={24} />
              </div>
              <h3>Products Management</h3>
              <div className="card-stats">
                <span className="stat-number">1,234</span>
                <span className="stat-label">Total Products</span>
              </div>
              <div className="card-footer">
                <span>12 Low Stock Items</span>
                <button className="view-button">Manage</button>
              </div>
            </div>
          </NavLink>

          {/* Orders Card */}
          <NavLink to="/orders" className="dashboard-card orders-card">
            <div className="card-content">
              <div className="card-icon">
                <FiShoppingCart size={24} />
              </div>
              <h3>Orders</h3>
              <div className="card-stats">
                <span className="stat-number">56</span>
                <span className="stat-label">Pending Orders</span>
              </div>
              <div className="card-footer">
                <span>LKR 12,450 Total Sales</span>
                <button className="view-button">View Orders</button>
              </div>
            </div>
          </NavLink>

          {/* Inventory Card */}
          <NavLink to="/inventory" className="dashboard-card inventory-card">
            <div className="card-content">
              <div className="card-icon">
                <FiBox size={24} />
              </div>
              <h3>Inventory</h3>
              <div className="card-stats">
                <span className="stat-number">84%</span>
                <span className="stat-label">Stock Available</span>
              </div>
              <div className="card-footer">
                <span>15 Items to Restock</span>
                <button className="view-button">Check Inventory</button>
              </div>
            </div>
          </NavLink>

          {/* Users Card */}
          <NavLink to="/users" className="dashboard-card users-card">
            <div className="card-content">
              <div className="card-icon">
                <FiUsers size={24} />
              </div>
              <h3>Users</h3>
              <div className="card-stats">
                <span className="stat-number">2,345</span>
                <span className="stat-label">Registered Users</span>
              </div>
              <div className="card-footer">
                <span>15 New Today</span>
                <button className="view-button">Manage Users</button>
              </div>
            </div>
          </NavLink>

          {/* Sales Overview Card */}
          <div className="dashboard-card sales-card">
            <div className="card-content">
              <div className="card-icon">
                <FiDollarSign size={24} />
              </div>
              <h3>Sales Overview</h3>
              <div className="card-stats">
                <span className="stat-number">LKR 45,670</span>
                <span className="stat-label">Monthly Revenue</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          {/* Account Management Card (Replaced Last Block) */}
          <NavLink to="/admin/profile" className="dashboard-card account-card">
            <div className="card-content">
              <div className="card-icon">
                <FiUser size={24} />
              </div>
              <h3>Admin Account Management</h3>
              <div className="account-details">
               {/* <p className="admin-name">{adminData?.firstName || 'Admin'} {adminData?.lastName}</p> 
                <p className="admin-email">{adminData?.email || 'admin@example.com'}</p> */}
              </div>
              <div className="card-footer">
                <button className="view-button">Edit Profile</button>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;