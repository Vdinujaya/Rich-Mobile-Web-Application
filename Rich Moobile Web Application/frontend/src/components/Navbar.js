import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
    return (
      <nav className="navbar">
        {/* Full-width banner */}
        <div className="banner-container">
          <Link to="/">
            <img 
              src="/images/nav_banner.jpg" 
              alt="Mobile Shop Banner" 
              className="shop-banner"
            />
          </Link>
        </div>
  
        {/* Navigation links container */}
        <div className="nav-container">
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
        </div>
      </nav>
    );
  };

export default Navbar;