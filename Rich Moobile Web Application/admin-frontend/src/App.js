import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import Products from './pages/ProductsManagement';
import Orders from './pages/OrdersManagement';
import Inventory from './pages/InventoryManagement';
import Users from './pages/UsersManagement';
import Settings from './pages/Settings';
import Add from './pages/AddProduct';
import Update from './pages/UpdateProduct';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminProfile from './pages/AdminProfile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
    
      try {
        // Verify token validity
        await axios.get('http://localhost:4000/api/admin/verify-token', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <Routes>
      {/* Default route redirects to register */}
      <Route path="/" element={
        isAuthenticated ? <Dashboard /> : <Navigate to="/admin/login" />
      }/>

      {/* Registration route */}
      <Route path="/admin/register" element={
        isAuthenticated ? <Navigate to="/" /> : 
        <AdminRegister setIsAuthenticated={setIsAuthenticated} />
      }/>

      {/* Login route */}
      <Route path="/admin/login" element={
        isAuthenticated ? <Navigate to="/" /> : 
        <AdminLogin setIsAuthenticated={setIsAuthenticated} />
      }/>

      {/* Protected routes */}
      <Route path="/dashboard" element={
        isAuthenticated ? <Dashboard /> : <Navigate to="/admin/register" />
      }/>
      <Route path="/products" element={
        isAuthenticated ? <Products /> : <Navigate to="/admin/register" />
      }/>
      <Route path="/orders" element={
        isAuthenticated ? <Orders /> : <Navigate to="/admin/register" />
      }/>
      <Route path="/inventory" element={
        isAuthenticated ? <Inventory /> : <Navigate to="/admin/register" />
      }/>
      <Route path="/users" element={
        isAuthenticated ? <Users /> : <Navigate to="/admin/register" />
      }/>
      <Route path="/settings" element={
        isAuthenticated ? 
      <Settings setIsAuthenticated={setIsAuthenticated} /> : 
      <Navigate to="/admin/register" />
      }/>
      <Route path="/add" element={
        isAuthenticated ? <Add /> : <Navigate to="/admin/register" />
      }/>
      <Route path="/update/:id" element={
        isAuthenticated ? <Update /> : <Navigate to="/admin/register" />
      }/>
      <Route path="/admin/profile" element={
        isAuthenticated ? 
      <AdminProfile setIsAuthenticated={setIsAuthenticated} /> : 
      <Navigate to="/admin/register" />
      }/>
    </Routes>
  );
};

export default App;