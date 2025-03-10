'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  summary: string;
}

const AnnouncementManager = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
  });

  // Duyuruları yükle
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('/api/duyurular');
      setAnnouncements(response.data);
      setError(null);
    } catch (err) {
      setError('Duyurular yüklenirken bir hata oluştu.');
      console.error('Duyurular yüklenirken hata:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Form değişikliklerini işle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Yeni duyuru ekle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAnnouncement) {
        // Mevcut duyuruyu güncelle
        await axios.put(`/api/duyurular/${editingAnnouncement.id}`, {
          ...formData,
          date: new Date().toLocaleDateString('tr-TR'),
        });
      } else {
        // Yeni duyuru ekle
        await axios.post('/api/duyurular', {
          ...formData,
          date: new Date().toLocaleDateString('tr-TR'),
        });
      }
      
      // Formu sıfırla ve duyuruları yeniden yükle
      setFormData({ title: '', content: '', summary: '' });
      setEditingAnnouncement(null);
      fetchAnnouncements();
    } catch (err) {
      setError('Duyuru kaydedilirken bir hata oluştu.');
      console.error('Duyuru kaydetme hatası:', err);
    }
  };

  // Duyuru düzenleme
  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      summary: announcement.summary,
    });
  };

  // Duyuru silme
  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu duyuruyu silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await axios.delete(`/api/duyurular/${id}`);
      fetchAnnouncements();
    } catch (err) {
      setError('Duyuru silinirken bir hata oluştu.');
      console.error('Duyuru silme hatası:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          {error}
        </div>
      )}

      {/* Duyuru Formu */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {editingAnnouncement ? 'Duyuru Düzenle' : 'Yeni Duyuru Ekle'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Başlık
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
              Özet
            </label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              İçerik
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editingAnnouncement ? 'Güncelle' : 'Ekle'}
            </button>
            {editingAnnouncement && (
              <button
                type="button"
                onClick={() => {
                  setEditingAnnouncement(null);
                  setFormData({ title: '', content: '', summary: '' });
                }}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Duyuru Listesi */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Duyurular</h2>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="border border-gray-200 rounded-md p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{announcement.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{announcement.date}</p>
                  <p className="text-gray-600 mt-2">{announcement.summary}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
          {announcements.length === 0 && (
            <p className="text-gray-500 text-center py-4">Henüz duyuru bulunmuyor.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementManager; 