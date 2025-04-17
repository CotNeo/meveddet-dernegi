'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { announcementService } from '@/services/announcementService';
import { Announcement } from '@/models/Announcement';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedSection from '@/components/animations/AnimatedSection';
import ClientOnly from '@/components/ClientOnly';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await announcementService.getAll();
        setAnnouncements(data);
        setLoading(false);
      } catch (err) {
        console.error('Duyurular yüklenirken hata:', err);
        setError('Duyurular yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ClientOnly>
          <FadeIn direction="up" duration={0.8}>
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Duyurular
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Derneğimizin faaliyetleri, etkinlikleri ve duyuruları hakkında güncel bilgilere buradan ulaşabilirsiniz.
              </motion.p>
            </motion.div>
          </FadeIn>
        </ClientOnly>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-md mb-8">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {announcements.map((announcement, index) => (
              <ClientOnly key={announcement.id}>
                <AnimatedSection delay={index * 0.2}>
                  <motion.div 
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center">
                        {announcement.image && (
                          <div className="relative w-16 h-16 mr-4">
                            <Image
                              src={announcement.image}
                              alt={announcement.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <h2 className="text-2xl font-bold text-gray-900">{announcement.title}</h2>
                      </div>
                      <div className="text-sm text-gray-500 mt-2 md:mt-0">
                        {new Date(announcement.date).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div 
                      className="prose max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{ __html: announcement.content }}
                    />
                  </motion.div>
                </AnimatedSection>
              </ClientOnly>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 