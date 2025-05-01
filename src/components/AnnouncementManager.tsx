'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Modal from './Modal';
import { Announcement } from '@/models/Announcement';
import { announcementService } from '@/services/announcementService';
import Image from 'next/image';

export default function AnnouncementManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState<Omit<Announcement, 'id'>>({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    imageFile: undefined
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await announcementService.getAll();
      setAnnouncements(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setError('Duyurular yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('date', formData.date);
      if (formData.imageFile) {
        formDataToSend.append('image', formData.imageFile);
      }

      if (selectedAnnouncement) {
        await announcementService.update(selectedAnnouncement.id, formDataToSend);
      } else {
        await announcementService.create(formDataToSend);
      }
      setIsModalOpen(false);
      setSelectedAnnouncement(null);
      setFormData({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        imageFile: undefined
      });
      setPreviewImage(null);
      fetchAnnouncements();
      setError(null);
    } catch (error) {
      console.error('Error saving announcement:', error);
      setError('Duyuru kaydedilirken bir hata oluştu');
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      date: announcement.date,
      image: announcement.image || '',
      imageFile: undefined
    });
    setPreviewImage(announcement.image || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu duyuruyu silmek istediğinizden emin misiniz?')) {
      try {
        await announcementService.delete(id);
        fetchAnnouncements();
        setError(null);
      } catch (error) {
        console.error('Error deleting announcement:', error);
        setError('Duyuru silinirken bir hata oluştu');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">{error}</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Duyurular</h2>
        <button
          onClick={() => {
            setSelectedAnnouncement(null);
            setFormData({
              title: '',
              content: '',
              date: new Date().toISOString().split('T')[0],
              image: '',
              imageFile: undefined
            });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Yeni Duyuru Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
                {announcement.image && (
                  <div className="relative w-32 h-32 mt-2">
                    <Image
                      src={announcement.image}
                      alt={announcement.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(announcement.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(announcement)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Duyuruyu Düzenle"
                  aria-label="Duyuruyu Düzenle"
                >
                  <FiEdit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Duyuruyu Sil"
                  aria-label="Duyuruyu Sil"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="prose max-w-none text-gray-700">
              {announcement.content}
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAnnouncement(null);
          setFormData({
            title: '',
            content: '',
            date: new Date().toISOString().split('T')[0],
            image: '',
            imageFile: undefined
          });
          setPreviewImage(null);
        }}
        title={selectedAnnouncement ? 'Duyuruyu Düzenle' : 'Yeni Duyuru Ekle'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Başlık
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
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
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Tarih
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Görsel
            </label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full"
            />
            {previewImage && (
              <div className="mt-2 relative w-32 h-32">
                <Image
                  src={previewImage}
                  alt="Önizleme"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedAnnouncement(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {selectedAnnouncement ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
} 