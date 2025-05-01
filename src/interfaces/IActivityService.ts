import { Activity } from '@/models/Activity';

/**
 * Faaliyet yönetimi için servis arayüzü
 * SOLID prensiplerinden Interface Segregation Principle'a uygun olarak
 * sadece gerekli metodları içerir
 */
export interface IActivityService {
  /**
   * Tüm faaliyetleri getirir
   * @returns Promise<Activity[]> - Faaliyet listesi
   */
  getAll(): Promise<Activity[]>;

  /**
   * Belirli bir faaliyeti ID'ye göre getirir
   * @param id - Faaliyet ID'si
   * @returns Promise<Activity> - Faaliyet detayı
   */
  getById(id: number): Promise<Activity>;

  /**
   * Yeni faaliyet oluşturur
   * @param formData - Faaliyet bilgileri ve dosyaları
   * @returns Promise<Activity> - Oluşturulan faaliyet
   */
  create(formData: FormData): Promise<Activity>;

  /**
   * Mevcut faaliyeti günceller
   * @param id - Güncellenecek faaliyet ID'si
   * @param formData - Güncellenecek faaliyet bilgileri ve dosyaları
   * @returns Promise<Activity> - Güncellenen faaliyet
   */
  update(id: number, formData: FormData): Promise<Activity>;

  /**
   * Faaliyeti siler
   * @param id - Silinecek faaliyet ID'si
   * @returns Promise<void>
   */
  delete(id: number): Promise<void>;
} 