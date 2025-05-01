import axios from 'axios';
import { Activity } from '@/models/Activity';
import { IActivityService } from '@/interfaces/IActivityService';

/**
 * Faaliyet yönetimi için API servisi
 * SOLID prensiplerinden Single Responsibility Principle'a uygun olarak
 * sadece faaliyet yönetimi ile ilgili işlemleri içerir
 */
export class ActivityService implements IActivityService {
  private readonly API_URL = '/api/faaliyetler';

  /**
   * Tüm faaliyetleri getirir
   * @returns Promise<Activity[]> - Faaliyet listesi
   */
  async getAll(): Promise<Activity[]> {
    try {
      const response = await axios.get(this.API_URL);
      return response.data;
    } catch (error) {
      console.error('Faaliyetler getirilirken hata:', error);
      throw new Error('Faaliyetler getirilirken bir hata oluştu');
    }
  }

  /**
   * Belirli bir faaliyeti ID'ye göre getirir
   * @param id - Faaliyet ID'si
   * @returns Promise<Activity> - Faaliyet detayı
   */
  async getById(id: number): Promise<Activity> {
    try {
      const response = await axios.get(`${this.API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Faaliyet getirilirken hata:', error);
      throw new Error('Faaliyet getirilirken bir hata oluştu');
    }
  }

  /**
   * Yeni faaliyet oluşturur
   * @param formData - Faaliyet bilgileri ve dosyaları
   * @returns Promise<Activity> - Oluşturulan faaliyet
   */
  async create(formData: FormData): Promise<Activity> {
    try {
      const response = await axios.post(this.API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Faaliyet oluşturulurken hata:', error);
      throw new Error('Faaliyet oluşturulurken bir hata oluştu');
    }
  }

  /**
   * Mevcut faaliyeti günceller
   * @param id - Güncellenecek faaliyet ID'si
   * @param formData - Güncellenecek faaliyet bilgileri ve dosyaları
   * @returns Promise<Activity> - Güncellenen faaliyet
   */
  async update(id: number, formData: FormData): Promise<Activity> {
    try {
      const response = await axios.put(`${this.API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Faaliyet güncellenirken hata:', error);
      throw new Error('Faaliyet güncellenirken bir hata oluştu');
    }
  }

  /**
   * Faaliyeti siler
   * @param id - Silinecek faaliyet ID'si
   * @returns Promise<void>
   */
  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.API_URL}/${id}`);
    } catch (error) {
      console.error('Faaliyet silinirken hata:', error);
      throw new Error('Faaliyet silinirken bir hata oluştu');
    }
  }
}

// Singleton instance
export const activityService = new ActivityService(); 