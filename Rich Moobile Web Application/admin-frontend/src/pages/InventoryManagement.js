import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiEdit, FiTrash, FiSearch } from 'react-icons/fi';
import AdminNavbar from '../components/AdminNavbar';
import axios from 'axios';
import '../styles/InventoryManagement.css';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/items');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(results);
    }
  }, [searchTerm, products]);

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`);
      setProducts(products.filter(product => product._id !== id));
      setFilteredProducts(filteredProducts.filter(product => product._id !== id));
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

      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, category, brand or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
          {filteredProducts.map(product => (
            <tr key={product._id}>
              <td>
                <img 
                  style={{height:'40px', width:'40px'}}
                  src={`http://localhost:4000/${product.image}`}
                  alt={product.name} 
                  className="product-image" 
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>LKR {product.price}</td>
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

      {filteredProducts.length === 0 && (
        <div className="no-results">
          {searchTerm ? 'No products match your search.' : 'No products available.'}
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;