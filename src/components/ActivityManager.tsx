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
    images: [] as File[],
    videos: [] as string[],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>([]);

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
        images: [],
        videos: activity.videos || [],
      });
      setPreviewImages(activity.images || []);
      setVideoLinks(activity.videos || []);
    } else {
      setSelectedActivity(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        images: [],
        videos: [],
      });
      setPreviewImages([]);
      setVideoLinks([]);
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
      images: [],
      videos: [],
    });
    setPreviewImages([]);
    setVideoLinks([]);
  };

  /**
   * Form alanlarını günceller
   * @param e - Form olayı
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Resim dosyalarını işler ve önizleme oluşturur
   * @param e - Dosya seçim olayı
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: files }));

    // Önizleme oluştur
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previews]);
  };

  /**
   * Video bağlantısı ekler
   */
  const handleAddVideo = () => {
    setVideoLinks(prev => [...prev, '']);
  };

  /**
   * Video bağlantısını günceller
   * @param index - Video indeksi
   * @param value - Yeni bağlantı değeri
   */
  const handleVideoChange = (index: number, value: string) => {
    setVideoLinks(prev => {
      const newLinks = [...prev];
      newLinks[index] = value;
      return newLinks;
    });
  };

  /**
   * Video bağlantısını siler
   * @param index - Silinecek video indeksi
   */
  const handleRemoveVideo = (index: number) => {
    setVideoLinks(prev => prev.filter((_, i) => i !== index));
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
      formData.images.forEach(image => formDataToSend.append('images', image));
      videoLinks.forEach(link => formDataToSend.append('videos', link));

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
            {activity.images && activity.images.length > 0 && (
              <div className="relative h-48">
                <Image
                  src={activity.images[0]}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
              <p className="text-gray-600 mb-2">{activity.description}</p>
              <p className="text-sm text-gray-500 mb-4">{activity.date}</p>
              <div className="flex justify-end space-x-2">
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
        ))}
      </div>

      {/* Faaliyet Ekleme/Düzenleme Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">
              {selectedActivity ? 'Faaliyet Düzenle' : 'Yeni Faaliyet Ekle'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Başlık</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    placeholder="Faaliyet başlığını girin"
                    title="Faaliyet başlığı"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Açıklama</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    required
                    placeholder="Faaliyet açıklamasını girin"
                    title="Faaliyet açıklaması"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tarih</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    title="Faaliyet tarihi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resimler</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="mt-1 block w-full"
                    title="Faaliyet resimleri"
                  />
                  {previewImages.length > 0 && (
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {previewImages.map((src, index) => (
                        <div key={index} className="relative h-24">
                          <Image
                            src={src}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Videolar</label>
                  {videoLinks.map((link, index) => (
                    <div key={index} className="flex space-x-2 mt-2">
                      <input
                        type="text"
                        value={link}
                        onChange={(e) => handleVideoChange(index, e.target.value)}
                        placeholder="Video bağlantısı"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveVideo(index)}
                        className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddVideo}
                    className="mt-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Video Ekle
                  </button>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
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
                  {selectedActivity ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}; 