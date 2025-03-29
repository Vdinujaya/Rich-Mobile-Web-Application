import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/placeOder.css';

const PlaceOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    quantity: 1
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }
    
    setUserEmail(email);
    fetchUserDetails(email);
    fetchItem();
  }, [navigate, id]);

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${email}`);
      setUserDetails(response.data);
      // Auto-fill form with user details
      setFormData({
        name: `${response.data.firstName} ${response.data.lastName}`,
        address: response.data.address,
        phone: response.data.phone,
        email: response.data.email,
        quantity: 1
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };

  const fetchItem = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/items/${id}`);
      setItem(res.data);
    } catch (err) {
      console.error("Error fetching item details:", err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        itemId: id,
        itemName: item.name,
        itemPrice: item.price,
        ...formData,
        totalPrice: item.price * formData.quantity,
        userId: userDetails?._id // Include user ID if available
      };
      
      await axios.post('http://localhost:4000/orders', orderData);
      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      console.error("Error placing order:", err);
      alert('Failed to place order. Please try again.');
    }
  };

  if (loading || !item) {
    return (
      <div className="app">
        <NavBar />
        <div className="loading">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <NavBar />
      <div className="place-order-container">
        <div className="place-order-card">
          <h2>Place Your Order</h2>
          {userDetails && (
            <div className="user-notice">
              <p>Your profile details have been auto-filled. You can edit them if needed.</p>
            </div>
          )}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p><strong>Item:</strong> {item.name}</p>
            <p><strong>Price per unit:</strong> RS: {item.price}.00</p>
          </div>
          
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Delivery Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                min="1"
                max={item.stock}
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="total-price">
              <h3>Total: RS: {item.price * formData.quantity}.00</h3>
            </div>
            
            <button type="submit" className="submit-order-button">
              Confirm Order
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceOrder;