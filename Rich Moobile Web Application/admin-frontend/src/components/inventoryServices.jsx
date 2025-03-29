import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Adjust to your backend URL

export const getInventorySummary = async () => {
  try {
    const response = await axios.get(`${API_URL}/items/stock/summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory summary:', error);
    throw error;
  }
};