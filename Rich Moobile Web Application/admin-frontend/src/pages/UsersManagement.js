import React from 'react';
import { FiUser, FiMail, FiEdit2 } from 'react-icons/fi';

const UsersManagement = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer' },
    { id: 2, name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
  ];

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>User Management</h2>
      </div>

      <div className="search-filter">
        <input type="text" placeholder="Search users..." />
        <select>
          <option>All Roles</option>
          <option>Admin</option>
          <option>Customer</option>
        </select>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><FiUser /> {user.name}</td>
              <td><FiMail /> {user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn-edit">
                  <FiEdit2 /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;