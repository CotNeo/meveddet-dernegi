import axios from 'axios';
import { Announcement } from '@/models/Announcement';

const API_URL = '/api/duyurular';

export const announcementService = {
  // Tüm duyuruları getir
  getAll: async (): Promise<Announcement[]> => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Duyurular getirilirken hata:', error);
      throw new Error('Duyurular getirilirken bir hata oluştu');
    }
  },

  // Tek bir duyuruyu getir
  getById: async (id: number): Promise<Announcement> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Duyuru getirilirken hata:', error);
      throw new Error('Duyuru getirilirken bir hata oluştu');
    }
  },

  // Yeni duyuru ekle
  create: async (formData: FormData): Promise<Announcement> => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Duyuru eklenirken hata:', error);
      throw new Error('Duyuru eklenirken bir hata oluştu');
    }
  },

  // Duyuru güncelle
  update: async (id: number, formData: FormData): Promise<Announcement> => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Duyuru güncellenirken hata:', error);
      throw new Error('Duyuru güncellenirken bir hata oluştu');
    }
  },

  // Duyuru sil
  delete: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Duyuru silinirken hata:', error);
      throw new Error('Duyuru silinirken bir hata oluştu');
    }
  },

  // Aktif duyuruları getir
  getActive: async (): Promise<Announcement[]> => {
    try {
      const response = await axios.get(API_URL);
      return response.data.filter((announcement: Announcement) => announcement.isActive);
    } catch (error) {
      console.error('Aktif duyurular getirilirken hata:', error);
      throw new Error('Aktif duyurular getirilirken bir hata oluştu');
    }
  }
}; 