import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './pages/admin/Dashboard';
import ProductsManagement from './pages/admin/ProductsManagement';
import OrdersManagement from './pages/admin/OrdersManagement';
import UsersManagement from './pages/admin/UsersManagement';
import Settings from './pages/admin/Settings';
import InventoryManagement from './pages/admin/InventoryManagement';
import './styles/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.retrieveItems();
  }

  retrieveItems() {
    axios.get("http://localhost:4000/items")
      .then(res => {
        this.setState({
          items: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        this.setState({
          error: err.message,
          loading: false
        });
      });
  }

  renderMainContent() {
    const { items, loading, error } = this.state;

    if (loading) {
      return <div className="loading">Loading products...</div>;
    }

    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    if (items.length === 0) {
      return <div className="no-products">No products found</div>;
    }

    return (
      <div className="products-grid">
        {items.map((item, index) => (
          <div className="product-card" key={index}>
            <img 
              src={`http://localhost:4000/${item.image}`}
              alt={item.name}
              className="product-image"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            <h3>{item.name}</h3>
            <p>Brand: {item.brand}</p>
            <p>Price: ${item.price}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      
        <div className="app-container">
          <Navbar />
          
          <Routes>
            {/* Main Public Route */}
            <Route path="/" element={
              <>
                <main className="container">
                  <h1 className="page-title">Latest Mobiles</h1>
                  {this.renderMainContent()}
                </main>
                <Footer />
              </>
            } />

            {/* Admin Routes */}
          <Route path="/admin" element={
              <>
              <AdminDashboard />
              </>
              }>
              <Route index element={<ProductsManagement />} />
              <Route path="products" element={<ProductsManagement />} />
              <Route path="orders" element={<OrdersManagement />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="inventory" element={<InventoryManagement />} />
              <Route path="settings" element={<Settings />} />
              </Route>
          </Routes>
        </div>
      
    );
  }
}

export default App;