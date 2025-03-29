import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiPackage, FiShoppingCart, FiUsers, FiBox, FiDollarSign, FiUser } from 'react-icons/fi';
import '../styles/Dashboard.css';
import { getInventorySummary } from '../components/inventoryServices';
import { getCustomerCount } from '../components/customerServices';
import { getOrderStatistics } from '../components/orderServices'; // You'll need to create this

const AdminNavbar = ({ adminData }) => {
  const [inventoryData, setInventoryData] = useState(null);
  const [customerCount, setCustomerCount] = useState(null);
  const [orderStats, setOrderStats] = useState(null);
  const [loading, setLoading] = useState({
    inventory: true,
    customers: true,
    orders: true
  });
  const [error, setError] = useState({
    inventory: null,
    customers: null,
    orders: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch inventory data
        const inventory = await getInventorySummary();
        setInventoryData(inventory);
        setLoading(prev => ({ ...prev, inventory: false }));
      } catch (err) {
        setError(prev => ({ ...prev, inventory: err.message }));
        setLoading(prev => ({ ...prev, inventory: false }));
      }

      try {
        // Fetch customer count
        const count = await getCustomerCount();
        setCustomerCount(count);
        setLoading(prev => ({ ...prev, customers: false }));
      } catch (err) {
        setError(prev => ({ ...prev, customers: err.message }));
        setLoading(prev => ({ ...prev, customers: false }));
      }

      try {
        // Fetch order statistics
        const stats = await getOrderStatistics();
        setOrderStats(stats);
        setLoading(prev => ({ ...prev, orders: false }));
      } catch (err) {
        setError(prev => ({ ...prev, orders: err.message }));
        setLoading(prev => ({ ...prev, orders: false }));
      }
    };

    fetchData();
  }, []);


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
              {loading.inventory ? (
                <div className="card-stats">
                  <span className="stat-number">Loading...</span>
                </div>
              ) : error.inventory ? (
                <div className="card-stats">
                  <span className="stat-number error">Error</span>
                  <span className="stat-label">{error.inventory}</span>
                </div>
              ) : (
                <div className="card-stats">
                  <span className="stat-number">
                    {inventoryData?.totalItems || 'N/A'}
                  </span>
                  <span className="stat-label">Total Products</span>
                </div>
              )}
              <div className="card-footer">
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
              {loading.orders ? (
                <div className="card-stats">
                  <span className="stat-number">Loading...</span>
                </div>
              ) : error.orders ? (
                <div className="card-stats">
                  <span className="stat-number error">Error</span>
                  <span className="stat-label">{error.orders}</span>
                </div>
              ) : (
                <>
                  <div className="card-stats">
                    <span className="stat-number">{orderStats?.pendingOrders || 0}</span>
                    <span className="stat-label">Pending Orders</span>
                  </div>
                  <div className="card-footer">
                    <span>{orderStats?.deliveredOrders || 0} Completed Orders</span>
                    <button className="view-button">View Orders</button>
                  </div>
                </>
              )}
            </div>
          </NavLink>

          {/* Inventory Card */}
          <NavLink to="/inventory" className="dashboard-card inventory-card">
            <div className="card-content">
              <div className="card-icon">
                <FiBox size={24} />
              </div>
              <h3>Inventory</h3>
              {loading.inventory ? (
                <div className="card-stats">
                  <span className="stat-number">Loading...</span>
                </div>
              ) : error.inventory ? (
                <div className="card-stats">
                  <span className="stat-number error">Error</span>
                  <span className="stat-label">{error.inventory}</span>
                </div>
              ) : (
                <>
                  <div className="card-stats">
                    <span className="stat-number">{inventoryData.stockPercentage}</span>
                    <span className="stat-label">Current Stock: {inventoryData.currentStock}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${inventoryData.status.toLowerCase()}`} 
                      style={{ width: inventoryData.stockPercentage }}
                    ></div>
                  </div>
                  <div className="card-footer">
                    <button className="view-button">Check Inventory</button>
                  </div>
                </>
              )}
            </div>
          </NavLink>

          {/* Users Card */}
          <NavLink to="/users" className="dashboard-card users-card">
            <div className="card-content">
              <div className="card-icon">
                <FiUsers size={24} />
              </div>
              <h3>Users</h3>
              {loading.customers ? (
                <div className="card-stats">
                  <span className="stat-number">Loading...</span>
                </div>
              ) : error.customers ? (
                <div className="card-stats">
                  <span className="stat-number error">Error</span>
                  <span className="stat-label">{error.customers}</span>
                </div>
              ) : (
                <>
                  <div className="card-stats">
                    <span className="stat-number">{customerCount}</span>
                    <span className="stat-label">Registered Customers</span>
                  </div>
                  <div className="card-footer">
                    <button className="view-button">Manage Users</button>
                  </div>
                </>
              )}
            </div>
          </NavLink>

          {/* Sales Overview Card */}
          {/* Sales Overview Card */}
<div className="dashboard-card sales-card">
  <div className="card-content">
    <div className="card-icon">
      <FiDollarSign size={24} />
    </div>
    <h3>Sales Overview</h3>
    {loading.orders ? (
      <div className="card-stats">
        <span className="stat-number">Loading...</span>
      </div>
    ) : error.orders ? (
      <div className="card-stats">
        <span className="stat-number error">Error</span>
        <span className="stat-label">{error.orders}</span>
      </div>
    ) : (
      <>
        <div className="card-stats">
          <span className="stat-number">LKR {orderStats?.deliveredRevenue?.toLocaleString() || 0}</span>
          <span className="stat-label">Total Revenue</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${Math.min(100, ((orderStats?.deliveredOrders || 0) / 
              (((orderStats?.deliveredOrders || 0) + (orderStats?.pendingOrders || 0)) || 1)) * 100)}%` 
            }}
          ></div>
        </div>
        <div className="card-stats">
          <span className="stat-label">
            {orderStats?.deliveredOrders || 0} / {(orderStats?.deliveredOrders || 0) + (orderStats?.pendingOrders || 0)}
          </span>
          <br/>
          <span className="stat-label">Completed / Total Orders</span>
        </div>
      </>
    )}
  </div>
</div>

          {/* Account Management Card */}
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