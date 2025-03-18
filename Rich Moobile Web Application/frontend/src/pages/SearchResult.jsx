// src/components/SearchResult.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchResults = location.state?.searchResults || [];

  return (
    <div className="app">
      <NavBar />
      <h1 style={{ textAlign: "center" }}>Search Results</h1>
      <div className="items-container">
        {searchResults.map((item, index) => (
          <div
            key={index}
            className="item-card"
            onClick={() => navigate(`/item/${item._id}`)} // Navigate to ItemDetails page
          >
            <img
              src={`http://localhost:4000/${item.image}`}
              alt={item.name}
              className="item-image"
            />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>
                <strong>RS: {item.price}.00</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResult;