import axios from 'axios';
import { ContactMessage } from '@/models/ContactMessage';

const API_URL = '/api/iletisim';

export const contactMessageService = {
  getAll: async (): Promise<ContactMessage[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id: number): Promise<ContactMessage> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (message: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContactMessage> => {
    const response = await axios.post(API_URL, message);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 