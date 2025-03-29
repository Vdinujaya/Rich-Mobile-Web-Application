// src/components/orderServices.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/orders'; // Adjust based on your API URL

export const getOrderStatistics = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats/summary`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch order statistics');
  }
};