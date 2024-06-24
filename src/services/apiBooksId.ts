import axios from 'axios';

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBookById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};
