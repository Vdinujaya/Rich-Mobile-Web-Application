import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import '../styles/AddProduct.css'; // Import the CSS file

const UpdateProduct = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/items/${id}`);
        const product = response.data;
        setFormData({
          name: product.name,
          category: product.category,
          brand: product.brand,
          description: product.description,
          price: product.price,
          stock: product.stock,
          specifications: product.specifications,
          image: product.image,
        });
        setPreviewImage(`http://localhost:4000/${product.image}`);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

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
      const response = await axios.put(`http://localhost:4000/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product updated successfully!');
      navigate('/inventory'); // Redirect to the products page
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="update-product-container">
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit} className="update-product-form">
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
            />
            {previewImage && (
              <img src={previewImage} alt="Preview" className="image-preview" />
            )}
          </div>
          <button type="submit" className="submit-button">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;