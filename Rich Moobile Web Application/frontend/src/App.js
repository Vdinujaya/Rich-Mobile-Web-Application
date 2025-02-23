import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      items:[]
    }
  }

  componentDidMount(){
    this.retrieveItems();
  }

  retrieveItems(){
    axios.get("http://localhost:4000/items").then(res=>{
      this.setState({
        items:res.data
      })
      console.log(this.state.items)
    }).catch(err=>{
      console.error("Error fetching posts:", err)
    })
  }

  render() {
    return (
      <div>
        {this.state.items.map(items=>(
          <div>
          <p>{items.name}</p>
          <p>{items.category}</p>
          <p>{items.brand}</p>
          <p>{items.description}</p>
          <p>{items.price}</p>
          <p>{items.stock}</p>
          <p>{items.specifications}</p>
          <img src={`http://localhost:4000/${items.image}`} alt={items.name} width="200" />

        </div>
        ))}
      </div>
    );
  }
}

export default App;