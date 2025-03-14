import React, { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';
import AdminNavbar from '../components/AdminNavbar';

const OrdersManagement = () => {
  // Mock reservation data
  const initialReservations = [
    {
      id: 'RES#2024-001',
      customer: 'John Doe',
      items: ['iPhone 15 Pro (128GB)', 'Samsung Charger'],
      reservationTime: '2024-03-20T14:30:00',
      pickupDeadline: '2024-03-21T14:30:00',
      status: 'pending',
      verificationCode: 'A5F3B2'
    },
    {
      id: 'RES#2024-002',
      customer: 'Jane Smith',
      items: ['Google Pixel 8'],
      reservationTime: '2024-03-20T10:00:00',
      pickupDeadline: '2024-03-21T10:00:00',
      status: 'picked-up',
      verificationCode: 'C9D1E4'
    }
  ];

  const [reservations, setReservations] = useState(initialReservations);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate time remaining
  const getTimeRemaining = (deadline) => {
    const deadlineTime = new Date(deadline).getTime();
    const timeDiff = deadlineTime - currentTime.getTime();
    
    if (timeDiff < 0) return 'Expired';
    
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    return `${hours}h ${minutes}m remaining`;
  };

  // Filter reservations
  const filteredReservations = reservations.filter(reservation => {
    if (filterStatus === 'all') return true;
    return reservation.status === filterStatus;
  });

  // Update reservation status
  const updateStatus = (id, newStatus) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: newStatus } : res
    ));
  };

  return (
    <div className="admin-content">
      <AdminNavbar />
      <div className="admin-header">
        <h2>Reservation Management</h2>
        <div className="filter-container">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Reservations</option>
            <option value="pending">Pending Pickup</option>
            <option value="picked-up">Picked Up</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="reservations-list">
        <div className="reservation-header">
          <div>Reservation ID</div>
          <div>Customer</div>
          <div>Items</div>
          <div>Pickup Deadline</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filteredReservations.map(reservation => {
          const isExpired = new Date(reservation.pickupDeadline) < currentTime;
          const status = isExpired ? 'expired' : reservation.status;

          return (
            <div className={`reservation-card ${status}`} key={reservation.id}>
              <div className="reservation-id">
                #{reservation.id}
                <div className="verification-code">
                  <FiInfo /> Code: {reservation.verificationCode}
                </div>
              </div>
              
              <div className="customer-info">{reservation.customer}</div>
              
              <div className="items-list">
                {reservation.items.map((item, index) => (
                  <div key={index} className="item">{item}</div>
                ))}
              </div>

              <div className="time-info">
                <div className="reservation-time">
                  <FiClock /> {new Date(reservation.reservationTime).toLocaleString()}
                </div>
                <div className="time-remaining">
                  {getTimeRemaining(reservation.pickupDeadline)}
                </div>
              </div>

              <div className="status-indicator">
                <span className={`status-badge ${status}`}>
                  {status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <div className="reservation-actions">
                {status === 'pending' && !isExpired && (
                  <>
                    <button 
                      className="btn-confirm"
                      onClick={() => updateStatus(reservation.id, 'picked-up')}
                    >
                      <FiCheckCircle /> Mark as Picked Up
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => updateStatus(reservation.id, 'expired')}
                    >
                      <FiXCircle /> Cancel Reservation
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersManagement;