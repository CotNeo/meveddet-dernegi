'use client';

import { useState } from 'react';
import logger from '@/utils/logger';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmitStatus {
  success: boolean;
  message: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setDebugInfo(null);

    try {
      // Form verilerini kontrol et
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Lütfen tüm alanları doldurun.');
      }

      // E-posta formatını kontrol et
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Lütfen geçerli bir e-posta adresi girin.');
      }

      // Debug bilgisi
      logger.debug('Form gönderiliyor', formData);

      // API isteği
      let response;
      try {
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (fetchError) {
        logger.error('Fetch hatası', fetchError);
        throw new Error('Sunucuya bağlanırken bir hata oluştu. Lütfen internet bağlantınızı kontrol edin.');
      }

      // Yanıt durumunu kontrol et
      if (!response) {
        throw new Error('Sunucudan yanıt alınamadı.');
      }

      // Debug bilgisi
      logger.debug('API yanıt durumu', { status: response.status, statusText: response.statusText });
      
      // Yanıtı JSON olarak parse et
      let data;
      try {
        data = await response.json();
        logger.debug('API yanıtı', data);
      } catch (jsonError) {
        logger.error('JSON parse hatası', jsonError);
        
        // Sadece geliştirme ortamında debug bilgisini göster
        if (process.env.NODE_ENV === 'development') {
          setDebugInfo(`JSON parse hatası: ${response.status} ${response.statusText}`);
        }
        
        throw new Error('Sunucu yanıtı işlenirken bir hata oluştu.');
      }

      // Başarısız yanıt durumunu kontrol et
      if (!response.ok) {
        // Hata mesajını güvenli bir şekilde al
        const errorMessage = data && typeof data === 'object' && data.error 
          ? data.error 
          : `Sunucu hatası: ${response.status} ${response.statusText}`;
        
        // Sadece geliştirme ortamında debug bilgisini göster
        if (process.env.NODE_ENV === 'development') {
          setDebugInfo(`Sunucu hatası: ${response.status} ${response.statusText}`);
        }
        
        throw new Error(errorMessage);
      }
      
      // Başarı mesajını güvenli bir şekilde al
      const successMessage = data && typeof data === 'object' && data.message
        ? data.message
        : 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';
      
      // Başarılı form gönderimi
      setSubmitStatus({
        success: true,
        message: successMessage,
      });
      
      // Formu temizle
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      logger.info('Form başarıyla gönderildi');
    } catch (error) {
      logger.error('Form gönderme hatası', error);
      
      // Hata mesajını ayarla
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
      
      setSubmitStatus({
        success: false,
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus && (
        <div
          className={`p-4 rounded-md ${
            submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Debug bilgisi sadece geliştirme ortamında gösterilir */}
      {debugInfo && process.env.NODE_ENV === 'development' && (
        <div className="p-4 rounded-md bg-yellow-50 text-yellow-800 text-sm">
          <p className="font-bold">Debug Bilgisi:</p>
          <p>{debugInfo}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Ad Soyad
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={100}
          pattern="^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$"
          title="Lütfen sadece harf kullanın"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-posta
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={100}
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          title="Lütfen geçerli bir e-posta adresi girin"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Konu
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          autoComplete="off"
          value={formData.subject}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={200}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          autoComplete="off"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={1000}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </div>
    </form>
  );
};

export default Form; 