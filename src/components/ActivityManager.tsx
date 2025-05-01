'use client';

import { useState, useEffect } from 'react';
import { Activity } from '@/models/Activity';
import { activityService } from '@/services/activityService';
import Image from 'next/image';

/**
 * Faaliyet yönetimi bileşeni
 * SOLID prensiplerinden Single Responsibility Principle'a uygun olarak
 * sadece faaliyet yönetimi arayüzünü içerir
 */
export const ActivityManager = () => {
  // State yönetimi
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: null as File | null,
    isActive: true
  });
  const [previewImage, setPreviewImage] = useState<string>('');

  // Faaliyetleri yükle
  useEffect(() => {
    console.log('ActivityManager mounted');
    fetchActivities();
  }, []);

  /**
   * Faaliyetleri API'den getirir
   */
  const fetchActivities = async () => {
    try {
      setLoading(true);
      console.log('Faaliyetler yükleniyor...');
      const data = await activityService.getAll();
      console.log('Yüklenen faaliyetler:', data);
      setActivities(data);
      setError(null);
    } catch (err) {
      console.error('Faaliyetler yüklenirken hata:', err);
      setError('Faaliyetler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Modal'ı açar ve seçili faaliyeti ayarlar
   * @param activity - Düzenlenecek faaliyet (opsiyonel)
   */
  const handleOpenModal = (activity?: Activity) => {
    if (activity) {
      setSelectedActivity(activity);
      setFormData({
        title: activity.title,
        description: activity.description,
        date: activity.date,
        location: activity.location,
        image: null,
        isActive: activity.isActive
      });
      setPreviewImage(activity.image);
    } else {
      setSelectedActivity(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        image: null,
        isActive: true
      });
      setPreviewImage('');
    }
    setIsModalOpen(true);
  };

  /**
   * Modal'ı kapatır ve form verilerini sıfırlar
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      image: null,
      isActive: true
    });
    setPreviewImage('');
  };

  /**
   * Form alanlarını günceller
   * @param e - Form olayı
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Resim dosyalarını işler ve önizleme oluşturur
   * @param e - Dosya seçim olayı
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));

    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewImage(preview);
    }
  };

  /**
   * Form gönderimini işler
   * @param e - Form gönderim olayı
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('isActive', formData.isActive.toString());
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (selectedActivity) {
        await activityService.update(selectedActivity.id, formDataToSend);
      } else {
        await activityService.create(formDataToSend);
      }

      handleCloseModal();
      fetchActivities();
    } catch (err) {
      setError('Faaliyet kaydedilirken bir hata oluştu');
      console.error('Faaliyet kaydedilirken hata:', err);
    }
  };

  /**
   * Faaliyeti siler
   * @param id - Silinecek faaliyet ID'si
   */
  const handleDelete = async (id: number) => {
    if (window.confirm('Bu faaliyeti silmek istediğinizden emin misiniz?')) {
      try {
        await activityService.delete(id);
        fetchActivities();
      } catch (err) {
        setError('Faaliyet silinirken bir hata oluştu');
        console.error('Faaliyet silinirken hata:', err);
      }
    }
  };

  // Yükleme durumu
  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  // Hata durumu
  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Faaliyet Yönetimi</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Yeni Faaliyet Ekle
        </button>
      </div>

      {/* Faaliyet Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map(activity => (
          <div key={activity.id} className="border rounded-lg overflow-hidden shadow-lg">
            {activity.image && (
              <div className="relative h-48">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
              <p className="text-gray-600 mb-2">{activity.description}</p>
              <p className="text-sm text-gray-500 mb-1">{activity.date}</p>
              <p className="text-sm text-gray-500 mb-4">{activity.location}</p>
              <div className="flex justify-between items-center mb-4">
                <span className={`text-sm ${activity.isActive ? 'text-green-500' : 'text-red-500'}`}>
                  {activity.isActive ? 'Aktif' : 'Pasif'}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenModal(activity)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Faaliyet Ekleme/Düzenleme Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">
              {selectedActivity ? 'Faaliyet Düzenle' : 'Yeni Faaliyet Ekle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Başlık</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Açıklama</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 h-32"
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">Tarih</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-1">Konum</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1">Görsel</label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded p-2"
                />
                {previewImage && (
                  <div className="mt-2 relative h-48">
                    <Image
                      src={previewImage}
                      alt="Önizleme"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <input
                  id="isActive"
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="isActive" className="text-sm font-medium">Aktif</label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}; 