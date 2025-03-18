import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ItemDetails.css'; // Import the new CSS file

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.retrieveItem(id);
  }

  retrieveItem(id) {
    axios.get(`http://localhost:4000/items/${id}`)
      .then(res => {
        this.setState({
          item: res.data
        });
      })
      .catch(err => {
        console.error("Error fetching item details:", err);
      });
  }

  render() {
    const { item } = this.state;
    if (!item) return <div className="loading">Loading...</div>;

    return (
      <div className="app">
        <NavBar />
        <div className="item-details-container">
          <div className="item-details-card">
            <img src={`http://localhost:4000/${item.image}`} alt={item.name} className="item-details-image" />
            <div className="item-details-info">
              <h1 className="item-name">{item.name}</h1>
              <p className="item-price"><strong>Price:</strong> RS: {item.price}.00</p>
              <p className="item-category"><strong>Category:</strong> {item.category}</p>
              <p className="item-brand"><strong>Brand:</strong> {item.brand}</p>
              <p className="item-description"><strong>Description:</strong> {item.description}</p>
              <p className="item-stock"><strong>Stock:</strong> {item.stock}</p>
              <p className="item-specifications"><strong>Specifications:</strong> {item.specifications}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

// Wrapper to use useParams in a class component
export default function ItemDetailsWrapper() {
  const params = useParams();
  return <ItemDetails params={params} />;
}