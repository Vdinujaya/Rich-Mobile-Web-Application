import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash, FiSave, FiPlus, FiSearch } from 'react-icons/fi';

const InventoryManagement = () => {
  // Mock data - replace with API calls
  const initialInventory = [
    {
      id: 'MOB001',
      name: 'iPhone 15 Pro',
      description: '6.1-inch Super Retina XDR display',
      category: 'Smartphones',
      stock: 45,
      price: 999,
      comments: 'New stock arriving 03/25'
    },
    {
      id: 'ACC025',
      name: 'Samsung Wireless Charger',
      description: '15W Fast Wireless Charging Pad',
      category: 'Accessories',
      stock: 82,
      price: 49.99,
      comments: 'Low priority restock'
    }
  ];

  // State management
  const [inventory, setInventory] = useState(initialInventory);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newStock, setNewStock] = useState({});

  // Search functionality
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Edit handlers
  const handleEdit = (id) => {
    setEditingId(id);
    const item = inventory.find(item => item.id === id);
    setNewStock({
      stock: item.stock,
      comments: item.comments
    });
  };

  const handleSave = (id) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, ...newStock } : item
    ));
    setEditingId(null);
  };

  // Table columns
  const columns = [
    { header: 'Item ID', accessor: 'id' },
    { header: 'Product Name', accessor: 'name' },
    { header: 'Description', accessor: 'description' },
    { header: 'Category', accessor: 'category' },
    { header: 'Stock', accessor: 'stock' },
    { header: 'Price', accessor: 'price' },
    { header: 'Comments', accessor: 'comments' },
    { header: 'Actions', accessor: 'actions' }
  ];

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>Inventory Management</h2>
        <div className="search-add-container">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary">
            <FiPlus /> Add New Item
          </button>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => {
                if (col.accessor === 'actions') {
                  return (
                    <td key="actions">
                      {editingId === item.id ? (
                        <>
                          <button 
                            className="btn-save"
                            onClick={() => handleSave(item.id)}
                          >
                            <FiSave />
                          </button>
                          <button
                            className="btn-cancel"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(item.id)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => {/* Add delete logic */}}
                          >
                            <FiTrash />
                          </button>
                        </>
                      )}
                    </td>
                  );
                }

                if (editingId === item.id && (col.accessor === 'stock' || col.accessor === 'comments')) {
                  return (
                    <td key={col.accessor}>
                      {col.accessor === 'stock' ? (
                        <input
                          type="number"
                          min="0"
                          value={newStock.stock}
                          onChange={(e) => setNewStock({
                            ...newStock,
                            stock: parseInt(e.target.value)
                          })}
                        />
                      ) : (
                        <input
                          type="text"
                          value={newStock.comments}
                          onChange={(e) => setNewStock({
                            ...newStock,
                            comments: e.target.value
                          })}
                        />
                      )}
                    </td>
                  );
                }

                return (
                  <td key={col.accessor}>
                    {col.accessor === 'price' ? `$${item[col.accessor]}` : item[col.accessor]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;