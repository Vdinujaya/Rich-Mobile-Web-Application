import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Adjust to your backend URL

export const getCustomerCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers/count`);
    return response.data.totalCustomers;
  } catch (error) {
    console.error('Error fetching customer count:', error);
    throw error;
  }
};