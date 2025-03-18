import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/App.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchQuery: "",
    };
  }

  componentDidMount() {
    this.retrieveItems();
  }

  retrieveItems() {
    axios
      .get("http://localhost:4000/items")
      .then((res) => {
        const shuffledItems = res.data.sort(() => 0.5 - Math.random());
        const selectedItems = shuffledItems.slice(0, 10);
        this.setState({
          items: selectedItems,
        });
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    const { searchQuery } = this.state;
    const { navigate } = this.props;

    axios
      .get(`http://localhost:4000/items/search?query=${searchQuery}`)
      .then((res) => {
        // Navigate to the SearchResults page with the search results
        navigate("/searchresult", { state: { searchResults: res.data } });
      })
      .catch((err) => {
        console.error("Error searching items:", err);
      });
  };

  render() {
    const { navigate } = this.props;
    const { items, searchQuery } = this.state;
    return (
      <div className="app">
        <NavBar />

        {/* Search Bar */}
        <div className="search-bar">
          <form onSubmit={this.handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={this.handleSearchChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {/* Discount Banner */}
        <div className="discount-banner">
          <h2>🔥 Limited-Time Offer: Up to 30% OFF on Accessories! 🔥</h2>
          <p>Hurry up! Grab your favorite gadgets before the deal ends.</p>
        </div>

        {/* Product Items */}
        <div className="items-container">
          {items.map((item, index) => (
            <div
              key={index}
              className="item-card"
              onClick={() => navigate(`/item/${item._id}`)}
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
  }
}

// Wrapper to use useNavigate in a class component
export default function HomeWrapper() {
  const navigate = useNavigate();
  return <Home navigate={navigate} />;
}