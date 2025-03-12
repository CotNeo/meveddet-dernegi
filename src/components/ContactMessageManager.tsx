'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

const ContactMessageManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Mesajları getir
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/contact');
      setMessages(response.data);
      setError(null);
    } catch (err) {
      console.error('Mesajlar yüklenirken hata oluştu:', err);
      setError('Mesajlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  // Mesaj sil
  const deleteMessage = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await axios.delete(`/api/contact/${id}`);
      setMessages(messages.filter(message => message.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Mesaj silinirken hata oluştu:', err);
      alert('Mesaj silinirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  // Tarih formatla
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Mesajları</h2>

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Henüz hiç mesaj yok.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mesaj Listesi */}
          <div className="md:col-span-1 border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-3 border-b">
              <h3 className="font-medium">Mesajlar ({messages.length})</h3>
            </div>
            <div className="overflow-y-auto max-h-[500px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{message.name}</h4>
                      <p className="text-sm text-gray-500">{message.subject}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatDate(message.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mesaj Detayı */}
          <div className="md:col-span-2 border rounded-lg">
            {selectedMessage ? (
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-medium">{selectedMessage.subject}</h3>
                    <p className="text-gray-500">
                      {formatDate(selectedMessage.date)}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Sil
                  </button>
                </div>

                <div className="mb-4">
                  <p className="font-medium">Gönderen:</p>
                  <p>{selectedMessage.name} ({selectedMessage.email})</p>
                </div>

                <div>
                  <p className="font-medium">Mesaj:</p>
                  <div className="mt-2 p-3 bg-gray-50 rounded whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-400">
                Detayları görmek için bir mesaj seçin
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessageManager; 