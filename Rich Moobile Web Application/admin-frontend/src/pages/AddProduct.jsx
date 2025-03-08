import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import '../styles/AddProduct.css'; // Import the CSS file

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Smart Phones', // Default category
    brand: '',
    description: '',
    price: '',
    stock: '',
    specifications: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:4000/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product added successfully!');
      navigate('/inventory'); // Redirect to the products page
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="add-product-container">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Smart Phones">Smart Phones</option>
              <option value="Back Covers">Back Covers</option>
              <option value="Head Phones">Head Phones</option>
              <option value="Speakers">Speakers</option>
              <option value="Phone Chargers">Phone Chargers</option>
              <option value="Computer Items">Computer Items</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Specifications</label>
            <textarea
              name="specifications"
              value={formData.specifications}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
            />
            {previewImage && (
              <img src={previewImage} alt="Preview" className="image-preview" />
            )}
          </div>
          <button type="submit" className="submit-button">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;