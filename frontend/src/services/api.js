import axios from 'axios';

const API_URL = 'http://localhost:5270/api';

export const getJobs = () => axios.get(`${API_URL}/jobs`);
export const createJob = (job) => axios.post(`${API_URL}/jobs`, job);
export const updateJob = (id, job) => axios.put(`${API_URL}/jobs/${id}`, job);
export const deleteJob = (id) => axios.delete(`${API_URL}/jobs/${id}`);

export const getWarehouses = () => axios.get(`${API_URL}/warehouses`);
export const createWarehouse = (warehouse) => axios.post(`${API_URL}/warehouses`, warehouse);
export const updateWarehouse = (id, warehouse) => axios.put(`${API_URL}/warehouses/${id}`, warehouse);
export const deleteWarehouse = (id) => axios.delete(`${API_URL}/warehouses/${id}`);

export const getChemicals = () => axios.get(`${API_URL}/chemicals`);
export const createChemical = (chemical) => axios.post(`${API_URL}/chemicals`, chemical);
export const updateChemical = (id, chemical) => axios.put(`${API_URL}/chemicals/${id}`, chemical);
export const deleteChemical = (id) => axios.delete(`${API_URL}/chemicals/${id}`);
