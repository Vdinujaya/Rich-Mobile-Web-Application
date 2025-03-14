import React, { useEffect } from 'react';
import '../styles/footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCommentDots } from 'react-icons/fa';

const Footer = () => {
  useEffect(() => {
    // Inject Botpress Webchat script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/03/04/05/20250304053109-BGL37ER9.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

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

        {/* Feedback Section (Added between Contact Us and Follow Us) */}
        <div className="footer-section">
          <h4>Give Feedback</h4>
          <p>We value your feedback! Help us improve.</p>
          <a href="/feedback" className="feedback-link">
            <FaCommentDots /> Share Your Thoughts
          </a>
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

      <div className="footer-bottom">
        <p>&copy; 2024 MobileShop. All rights reserved | Designed by 5th Dimension</p>
      </div>
    </footer>
  );
};

export default Footer;
