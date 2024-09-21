import React, { useState, useEffect } from 'react';
import { getWarehouses, createWarehouse, updateWarehouse, deleteWarehouse } from '../services/api';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [formData, setFormData] = useState({ capacity: '', adjacentWarehouse: '', warehouseName: '' });

  useEffect(() => {
    loadWarehouses();
  }, []);

  const loadWarehouses = async () => {
    const response = await getWarehouses();
    setWarehouses(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateWarehouse(formData.id, formData);
    } else {
      await createWarehouse(formData);
    }
    setFormData({ capacity: '', adjacentWarehouse: '', warehouseName: '' });
    loadWarehouses();
  };

  const handleEdit = (warehouse) => {
    setFormData(warehouse);
  };

  const handleDelete = async (id) => {
    await deleteWarehouse(id);
    loadWarehouses();
  };

  return (
    <div>
      <h2>Warehouse List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Adjacent Warehouse"
          value={formData.adjacentWarehouse}
          onChange={(e) => setFormData({ ...formData, adjacentWarehouse: e.target.value })}
        />
        <input
          type="text"
          placeholder="Warehouse Name"
          value={formData.warehouseName}
          onChange={(e) => setFormData({ ...formData, warehouseName: e.target.value })}
        />
        <button type="submit">{formData.id ? 'Update' : 'Create'}</button>
      </form>

      <ul>
        {warehouses.map((warehouse) => (
          <li key={warehouse.warehouseID}>
            {warehouse.capacity} - {warehouse.adjacentWarehouse} - {warehouse.warehouseName}
            <button onClick={() => handleEdit(warehouse)}>Edit</button>
            <button onClick={() => handleDelete(warehouse.warehouseID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseList;
