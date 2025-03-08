import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiEdit, FiTrash } from 'react-icons/fi';

const ProductsManagement = () => {
  // Temporary mock data
  const products = [
    { id: 1, name: 'iPhone 15', price: 999, stock: 50 },
    { id: 2, name: 'Samsung S24', price: 899, stock: 30 },
  ];

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>Product Management</h2>
        <Link to="/admin/products/new" className="btn-primary">
          <FiPlusCircle /> Add Product
        </Link>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button className="btn-edit">
                  <FiEdit />
                </button>
                <button className="btn-delete">
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

export default ProductsManagement;