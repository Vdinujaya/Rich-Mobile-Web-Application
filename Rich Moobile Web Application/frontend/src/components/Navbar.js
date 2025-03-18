import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { FaUser } from 'react-icons/fa';
import '../styles/navbar.css';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
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
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/smartphones" 
            className={`nav-link ${isActive('/smartphones') ? 'active' : ''}`}
          >
            Smart Phones
          </Link>
          <Link 
            to="/backcovers" 
            className={`nav-link ${isActive('/backcovers') ? 'active' : ''}`}
          >
            Back Covers
          </Link>
          <Link 
            to="/headphones" 
            className={`nav-link ${isActive('/headphones') ? 'active' : ''}`}
          >
            Head Phones
          </Link>
          <Link 
            to="/speakers" 
            className={`nav-link ${isActive('/speakers') ? 'active' : ''}`}
          >
            Speakers
          </Link>
          <Link 
            to="/phonecharges" 
            className={`nav-link ${isActive('/phonecharges') ? 'active' : ''}`}
          >
            Phone Charges
          </Link>
          <Link 
            to="/computeritems" 
            className={`nav-link ${isActive('/computeritems') ? 'active' : ''}`}
          >
            Computer Items
          </Link>
          {/* Profile Link with Icon */}
          <Link 
            to="/profile" 
            className={`nav-link profile-link ${isActive('/profile') ? 'active' : ''}`}
          >
            <FaUser className="profile-icon" />
          </Link>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="close-icon" onClick={toggleSidebar}>
          &#10005; {/* Unicode for 'x' icon */}
        </div>
        <ul className="sidebar-links">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/smartphones" 
              className={`nav-link ${isActive('/smartphones') ? 'active' : ''}`}
            >
              Smart Phones
            </Link>
          </li>
          <li>
            <Link 
              to="/backcovers" 
              className={`nav-link ${isActive('/backcovers') ? 'active' : ''}`}
            >
              Back Covers
            </Link>
          </li>
          <li>
            <Link 
              to="/headphones" 
              className={`nav-link ${isActive('/headphones') ? 'active' : ''}`}
            >
              Head Phones
            </Link>
          </li>
          <li>
            <Link 
              to="/speakers" 
              className={`nav-link ${isActive('/speakers') ? 'active' : ''}`}
            >
              Speakers
            </Link>
          </li>
          <li>
            <Link 
              to="/phonecharges" 
              className={`nav-link ${isActive('/phonecharges') ? 'active' : ''}`}
            >
              Phone Charges
            </Link>
          </li>
          <li>
            <Link 
              to="/computeritems" 
              className={`nav-link ${isActive('/computeritems') ? 'active' : ''}`}
            >
              Computer Items
            </Link>
          </li>
          <li>
            <Link 
              to="/other" 
              className={`nav-link ${isActive('/other') ? 'active' : ''}`}
            >
              Other
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;