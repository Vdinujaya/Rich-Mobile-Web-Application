import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.retrieveItems();
  }

  retrieveItems() {
    axios.get("http://localhost:4000/items")
      .then(res => {
        // Filter items where category is 'Others'
        const filteredItems = res.data.filter(item => item.category === 'Speakers');
        this.setState({
          items: filteredItems
        });
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
      });
  }

  render() {
    const { navigate } = this.props;
    return (
      <div className="app">
        <NavBar />
        <div className="items-container">
          {this.state.items.map((item, index) => (
            <div key={index} className="item-card" onClick={() => navigate(`/item/${item._id}`)}>
              <img src={`http://localhost:4000/${item.image}`} alt={item.name} className="item-image" />
              <div className="item-details" style={{textAlign:'center'}}>
                <h3>{item.name}</h3>
                <p><strong>RS: {item.price}.00</strong></p>
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