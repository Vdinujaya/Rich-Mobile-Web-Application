import React from 'react';
import '../styles/footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCommentDots } from 'react-icons/fa';

const Footer = () => {
  const handleFeedbackClick = () => {
    // Open a feedback form or modal
    alert('Thank you for your feedback! Please share your thoughts.');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About MobileShop</h4>
          <p>Your trusted destination for premium mobile devices and accessories since 2020.</p>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/shipping">Shipping Policy</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <p><FaMapMarkerAlt /> NO.01, Highlevel Road, Meepe, Padukka </p>
            <p><FaPhone /> (+94) 071-2139219</p>
            <p><FaEnvelope /> support@RichMobile.com</p>
          </div>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Feedback Button */}
      <div className="feedback-button" onClick={handleFeedbackClick}>
        <FaCommentDots /> Give Feedback
      </div>

      {/* Chatbot Script */}
      <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"></script>
      <script src="https://files.bpcontent.cloud/2025/03/04/05/20250304053109-BGL37ER9.js"></script>

      <div className="footer-bottom">
        <p>&copy; 2024 MobileShop. All rights reserved | Designed by 5th Dimension</p>
      </div>
    </footer>
  );
};

export default Footer;