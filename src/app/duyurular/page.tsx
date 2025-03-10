'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  summary: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('/api/duyurular');
        setAnnouncements(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Duyurular yüklenirken hata oluştu:', err);
        setError('Duyurular yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setLoading(false);
        
        // Geçici olarak örnek veriler göster
        setAnnouncements([
          {
            id: 1,
            title: 'Yardım Kampanyası Başladı',
            date: '15 Mart 2023',
            content: 'İhtiyaç sahiplerine yardım etmek için yeni kampanyamız başladı. Bu kampanya kapsamında...',
            summary: 'İhtiyaç sahiplerine yardım etmek için yeni kampanyamız başladı. Detaylı bilgi için tıklayın.',
          },
          {
            id: 2,
            title: 'Gönüllü Toplantısı',
            date: '20 Mart 2023',
            content: 'Derneğimizin gönüllüleri ile yapılacak toplantı hakkında bilgilendirme...',
            summary: 'Derneğimizin gönüllüleri ile yapılacak toplantı hakkında bilgilendirme.',
          },
          {
            id: 3,
            title: 'Eğitim Desteği Projesi',
            date: '25 Mart 2023',
            content: 'Öğrencilere eğitim desteği sağlamak için başlattığımız yeni projemiz hakkında bilgi...',
            summary: 'Öğrencilere eğitim desteği sağlamak için başlattığımız yeni projemiz hakkında bilgi.',
          },
        ]);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Duyurular</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Derneğimizin faaliyetleri, etkinlikleri ve duyuruları hakkında güncel bilgilere buradan ulaşabilirsiniz.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-md mb-8">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{announcement.title}</h2>
                  <div className="text-sm text-gray-500 mt-2 md:mt-0">{announcement.date}</div>
                </div>
                <p className="text-gray-600 mb-4">{announcement.summary}</p>
                <Link
                  href={`/duyurular/${announcement.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Devamını Oku
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 