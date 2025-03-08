import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import '../../styles/admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <AdminNavbar />
      
      <main className="admin-main">
        <div className="admin-content">
          <Outlet /> {/* This will render nested routes */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;