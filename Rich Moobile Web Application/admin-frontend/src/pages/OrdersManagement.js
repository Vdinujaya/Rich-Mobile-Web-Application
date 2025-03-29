import React, { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiPackage, FiX } from 'react-icons/fi';
import AdminNavbar from '../components/AdminNavbar';
import '../styles/ordersManagement.css'

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/orders', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Invalid response: ${text.substring(0, 100)}...`);
        }

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch orders');
        }

        setOrders(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:4000/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Invalid response: ${text.substring(0, 100)}...`);
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update order status');
      }

      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      setError(err.message);
      console.error('Update error:', err);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      'pending': { text: 'Pending', class: 'pending', icon: <FiClock /> },
      'processing': { text: 'Processing', class: 'processing', icon: <FiPackage /> },
      'delivered': { text: 'Delivered', class: 'delivered', icon: <FiCheckCircle /> },
      'cancelled': { text: 'Cancelled', class: 'cancelled', icon: <FiX /> }
    };
    return statusMap[status] || { text: status, class: status, icon: null };
  };

  if (loading) {
    return (
      <div className="admin-content">
        <AdminNavbar />
        <div className="loading-spinner">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-content">
        <AdminNavbar />
        <div className="error-message">
          Error loading orders: {error}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <AdminNavbar/>
      <div className="admin-header">
        <h2>Order Management</h2>
        <div className="filter-container">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="orders-list">
        <div className="order-header">
          <div>Order ID</div>
          <div>Customer</div>
          <div>Items</div>
          <div>Order Date</div>
          <div>Total</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const statusInfo = getStatusInfo(order.status);

            return (
              <div className={`order-card ${statusInfo.class}`} key={order._id}>
                <div className="order-id">
                  #{order._id.substring(18, 24).toUpperCase()}
                </div>
                
                <div className="customer-info">
                  <div>{order.customerName}</div>
                  <div className="customer-email">{order.customerEmail}</div>
                </div>
                
                <div className="items-list">
                  <div className="item">
                    {order.itemName} × {order.quantity}
                  </div>
                  {order.items && order.items.length > 1 && (
                    <div className="additional-items">+{order.items.length - 1} more</div>
                  )}
                </div>

                <div className="order-date">
                  <FiClock /> {formatDate(order.orderDate)}
                </div>

                <div className="order-total">
                  LKR {order.totalPrice.toFixed(2)}
                </div>

                <div className="status-indicator">
                  <span className={`status-badge ${statusInfo.class}`}>
                    {statusInfo.icon} {statusInfo.text}
                  </span>
                </div>

                <div className="order-actions">
                  {order.status === 'pending' && (
                    <>
                      <button 
                        className="btn-process"
                        onClick={() => updateOrderStatus(order._id, 'processing')}
                      >
                        <FiPackage /> Process
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => updateOrderStatus(order._id, 'cancelled')}
                      >
                        <FiX /> Cancel
                      </button>
                    </>
                  )}
                  {order.status === 'processing' && (
                    <button 
                      className="btn-deliver"
                      onClick={() => updateOrderStatus(order._id, 'delivered')}
                    >
                      <FiCheckCircle /> Deliver
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-orders">No orders found</div>
        )}
      </div>
    </div>
  );
};

export default OrdersManagement;