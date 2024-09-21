import React, { useState, useEffect } from 'react';
import { getChemicals, createChemical, updateChemical, deleteChemical } from '../services/api';

const ChemicalList = () => {
  const [chemicals, setChemicals] = useState([]);
  const [formData, setFormData] = useState({
    chemicalType: '',
    volatility: '',
    fireHazard: '',
    volume: '',
    warehouseID: '',
    jobID: ''
  });

  useEffect(() => {
    loadChemicals();
  }, []);

  const loadChemicals = async () => {
    const response = await getChemicals();
    setChemicals(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.id) {
      await updateChemical(formData.id, formData);
    } else {
      await createChemical(formData);
    }

    setFormData({ chemicalType: '', volatility: '', fireHazard: '', volume: '', warehouseID: '', jobID: '' });
    loadChemicals();
  };

  const handleEdit = (chemical) => {
    setFormData(chemical);
  };

  const handleDelete = async (id) => {
    await deleteChemical(id);
    loadChemicals();
  };

  return (
    <div>
      <h2>Chemical List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Chemical Type"
          value={formData.chemicalType}
          onChange={(e) => setFormData({ ...formData, chemicalType: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Volatility"
          value={formData.volatility}
          onChange={(e) => setFormData({ ...formData, volatility: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Fire Hazard"
          value={formData.fireHazard}
          onChange={(e) => setFormData({ ...formData, fireHazard: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Volume"
          value={formData.volume}
          onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Warehouse ID"
          value={formData.warehouseID}
          onChange={(e) => setFormData({ ...formData, warehouseID: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Job ID"
          value={formData.jobID}
          onChange={(e) => setFormData({ ...formData, jobID: e.target.value })}
          required
        />
        <button type="submit">{formData.id ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {chemicals.map((chemical) => (
          <li key={chemical.chemicalID}>
            {chemical.chemicalType} - {chemical.volatility} - {chemical.fireHazard} - {chemical.volume} 
            (Warehouse: {chemical.warehouseID}, Job: {chemical.jobID})
            <button onClick={() => handleEdit(chemical)}>Edit</button>
            <button onClick={() => handleDelete(chemical.chemicalID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChemicalList;
