import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

      {/* Hamburger Icon */}
      <div className="hamburger-icon" onClick={toggleSidebar}>
        &#9776; {/* Unicode for hamburger icon */}
      </div>

      {/* Navigation links container */}
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/smartphones" className="nav-link">Smart Phones</Link>
          <Link to="/backcovers" className="nav-link">Back Covers</Link>
          <Link to="/headphones" className="nav-link">Head Phones</Link>
          <Link to="/speakers" className="nav-link">Speakers</Link>
          <Link to="/phonecharges" className="nav-link">Phone Charges</Link>
          <Link to="/computeritems" className="nav-link">Computer Items</Link>
          <Link to="/other" className="nav-link">Other</Link>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="close-icon" onClick={toggleSidebar}>
          &#10005; {/* Unicode for 'x' icon */}
        </div>
        <ul className="sidebar-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/smartphones" className="nav-link">Smart Phones</Link></li>
          <li><Link to="/backcovers" className="nav-link">Back Covers</Link></li>
          <li><Link to="/headphones" className="nav-link">Head Phones</Link></li>
          <li><Link to="/speakers" className="nav-link">Speakers</Link></li>
          <li><Link to="/phonecharges" className="nav-link">Phone Charges</Link></li>
          <li><Link to="/computeritems" className="nav-link">Computer Items</Link></li>
          <li><Link to="/other" className="nav-link">Other</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;