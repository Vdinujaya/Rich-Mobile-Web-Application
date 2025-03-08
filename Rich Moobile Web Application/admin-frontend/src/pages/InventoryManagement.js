import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiEdit, FiTrash } from 'react-icons/fi';
import AdminNavbar from '../components/AdminNavbar';
import axios from 'axios';
import '../styles/InventoryManagement.css'; // Import the CSS file

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/items'); // Replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`); // Replace with your API endpoint
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-content">
      <AdminNavbar />
      <div className="admin-header">
        <h2>Inventory Management</h2>
        <Link to="/add" className="btn-primary">
          <FiPlusCircle /> Add Items
        </Link>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>
                <img style={{height:'40px', width:'40px'}}
                  src={`http://localhost:4000/${product.image}`}
                  alt={product.name} 
                  className="product-image" 
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Link to={`/update/${product._id}`} className="btn-edit">
                  <FiEdit />
                </Link>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(product._id)}
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;