'use client';

import { useState, useEffect } from 'react';
import { contactMessageService } from '../services/contactMessageService';
import { ContactMessage } from '../models/ContactMessage';
import Modal from './Modal';

export default function ContactMessageManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await contactMessageService.getAll();
      setMessages(data);
      setError('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Mesajlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      try {
        await contactMessageService.delete(id);
        fetchMessages();
        setError('');
      } catch (error) {
        console.error('Error deleting message:', error);
        setError('Mesaj silinirken bir hata oluştu');
      }
    }
  };

  const handleView = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">İletişim Mesajları</h2>
      </div>

      <div className="grid gap-6">
        {messages.map((message) => (
          <div key={message.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{message.name}</h3>
                <p className="text-gray-600 mt-2">{message.email}</p>
                <p className="text-gray-600 mt-2">{message.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Tarih: {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleView(message)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Görüntüle
                </button>
                <button
                  onClick={() => handleDelete(message.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMessage(null);
        }}
        title="Mesaj Detayı"
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Ad Soyad</h4>
              <p className="mt-1">{selectedMessage.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">E-posta</h4>
              <p className="mt-1">{selectedMessage.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Mesaj</h4>
              <p className="mt-1 whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Tarih</h4>
              <p className="mt-1">
                {new Date(selectedMessage.createdAt).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedMessage(null);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 