import { Announcement } from '@/models/Announcement';
import axios from 'axios';

const API_URL = '/api/duyurular';

export const announcementService = {
  // Tüm duyuruları getir
  getAll: async (): Promise<Announcement[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Tek bir duyuruyu getir
  getById: async (id: number): Promise<Announcement> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Yeni duyuru ekle
  create: async (announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Announcement> => {
    const response = await axios.post(API_URL, announcement);
    return response.data;
  },

  // Duyuru güncelle
  update: async (id: number, announcement: Partial<Announcement>): Promise<Announcement> => {
    const response = await axios.put(`${API_URL}/${id}`, announcement);
    return response.data;
  },

  // Duyuru sil
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  // Aktif duyuruları getir
  getActive: async (): Promise<Announcement[]> => {
    const response = await axios.get(API_URL);
    return response.data.filter((announcement: Announcement) => announcement.isActive);
  }
}; 