'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  summary: string;
}

export default function AnnouncementDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get(`/api/duyurular/${id}`);
        setAnnouncement(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Duyuru detayları yüklenirken hata oluştu:', err);
        setError('Duyuru detayları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setLoading(false);
        
        // Geçici olarak örnek veri göster
        if (id === '1') {
          setAnnouncement({
            id: 1,
            title: 'Yardım Kampanyası Başladı',
            date: '15 Mart 2023',
            content: `
              <p>İhtiyaç sahiplerine yardım etmek için yeni kampanyamız başladı.</p>
              <p>Bu kampanya kapsamında, ekonomik zorluklar yaşayan ailelere gıda, giyim ve temel ihtiyaç malzemeleri ulaştırılacaktır. Kampanyamıza destek olmak isteyen gönüllülerimiz, dernek merkezimize bağış yapabilir veya yardım paketlerinin hazırlanmasında görev alabilirler.</p>
              <p>Yardım paketleri, her ay düzenli olarak belirlenen ailelere ulaştırılacaktır. Kampanyamız hakkında detaylı bilgi almak ve destek olmak için derneğimizle iletişime geçebilirsiniz.</p>
              <p>Sizin küçük bir desteğiniz, bir ailenin hayatında büyük bir fark yaratabilir.</p>
            `,
            summary: 'İhtiyaç sahiplerine yardım etmek için yeni kampanyamız başladı. Detaylı bilgi için tıklayın.',
          });
        } else if (id === '2') {
          setAnnouncement({
            id: 2,
            title: 'Gönüllü Toplantısı',
            date: '20 Mart 2023',
            content: `
              <p>Derneğimizin gönüllüleri ile yapılacak toplantı hakkında bilgilendirme.</p>
              <p>Değerli gönüllülerimiz, önümüzdeki ay gerçekleştireceğimiz projeler ve etkinlikler hakkında bilgi vermek ve fikir alışverişinde bulunmak üzere bir toplantı düzenliyoruz.</p>
              <p>Toplantımız 20 Mart 2023 tarihinde saat 14:00'te dernek merkezimizde gerçekleştirilecektir. Tüm gönüllülerimizin katılımını bekliyoruz.</p>
              <p>Toplantıda ele alınacak konular:</p>
              <ul>
                <li>Yeni dönem projeleri</li>
                <li>Gönüllü çalışma grupları</li>
                <li>Kaynak geliştirme faaliyetleri</li>
                <li>Sosyal medya ve tanıtım çalışmaları</li>
              </ul>
            `,
            summary: 'Derneğimizin gönüllüleri ile yapılacak toplantı hakkında bilgilendirme.',
          });
        } else if (id === '3') {
          setAnnouncement({
            id: 3,
            title: 'Eğitim Desteği Projesi',
            date: '25 Mart 2023',
            content: `
              <p>Öğrencilere eğitim desteği sağlamak için başlattığımız yeni projemiz hakkında bilgi.</p>
              <p>Derneğimiz, ekonomik zorluklar yaşayan ailelerin çocuklarına eğitim desteği sağlamak amacıyla yeni bir proje başlatmıştır. Bu proje kapsamında, ilkokul, ortaokul ve lise öğrencilerine kitap, kırtasiye malzemeleri ve eğitim bursu desteği verilecektir.</p>
              <p>Projemize destek olmak isteyen bağışçılarımız, bir öğrencinin bir yıllık eğitim masraflarını karşılayabilir veya kırtasiye malzemesi bağışında bulunabilirler.</p>
              <p>Eğitim, her çocuğun hakkıdır ve biz bu hakkı desteklemek için var gücümüzle çalışıyoruz. Sizin de desteğinizle, daha fazla öğrenciye ulaşmayı hedefliyoruz.</p>
            `,
            summary: 'Öğrencilere eğitim desteği sağlamak için başlattığımız yeni projemiz hakkında bilgi.',
          });
        }
      }
    };

    if (id) {
      fetchAnnouncement();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 text-red-800 p-4 rounded-md mb-8">
            {error || 'Duyuru bulunamadı.'}
          </div>
          <Link href="/duyurular" className="text-purple-600 hover:text-purple-800 font-medium">
            ← Tüm Duyurulara Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/duyurular" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Tüm Duyurulara Dön
          </Link>
        </div>

        <article className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <Image 
              src="/logo.png" 
              alt="Meveddet Derneği Logo" 
              width={40} 
              height={40} 
              className="mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{announcement.title}</h1>
              <div className="text-sm text-gray-500">{announcement.date}</div>
            </div>
          </div>

          <div 
            className="prose max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: announcement.content }}
          />
        </article>
      </div>
    </div>
  );
} 