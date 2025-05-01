'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { announcementService } from '@/services/announcementService';
import { Announcement } from '@/models/Announcement';

export default function HomePage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await announcementService.getAll();
        setAnnouncements(data);
        setLoading(false);
      } catch (err) {
        console.error('Duyurular yüklenirken hata:', err);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-purple-900 bg-opacity-30" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Meveddet Derneği
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tasavvuf tarihini ve kültürünü araştırıp tanıtmak ve korunmasını sağlamak amacıyla yola çıktık.
            <br />
            <span className="italic">Hayırlar feth ola, şerler def ola...</span>
          </motion.p>
          <motion.div
            className="mt-8 flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/hakkimizda"
              className="inline-block bg-white text-purple-900 px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors duration-300"
            >
              Bizi Tanıyın
            </Link>
            <Link
              href="/iletisim"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-900 transition-colors duration-300"
            >
              İletişim
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Duyurular Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Duyurular</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center text-black py-12">
              Henüz duyuru bulunmamaktadır.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {announcements.slice(0, 3).map((announcement) => (
                <Link 
                  href={`/duyurular#${announcement.id}`} 
                  key={announcement.id}
                  className="block"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {announcement.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={announcement.image}
                          alt={announcement.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-black mb-2">
                        {announcement.title}
                      </h3>
                      <div className="text-sm text-black mb-4">
                        {new Date(announcement.date).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div 
                        className="prose text-black line-clamp-3"
                        dangerouslySetInnerHTML={{ 
                          __html: announcement.content.replace(/<[^>]*>/g, ' ').substring(0, 150) + '...'
                        }}
                      />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}

          {announcements.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/duyurular"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
              >
                Tüm Duyurular
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
