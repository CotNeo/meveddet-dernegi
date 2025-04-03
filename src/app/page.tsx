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
        const data = await announcementService.getActive();
        setAnnouncements(data);
      } catch (error) {
        console.error('Duyurular yüklenirken hata:', error);
      } finally {
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Duyurular</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : announcements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {announcements.map((announcement) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {announcement.image && (
                    <div className="relative h-48">
                      <Image
                        src={announcement.image}
                        alt={announcement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{announcement.summary}</p>
                    <div className="text-sm text-gray-500">{announcement.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-12">
              Henüz duyuru bulunmamaktadır.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
