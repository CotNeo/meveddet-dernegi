'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { announcementService } from '@/services/announcementService';
import { Announcement } from '@/models/Announcement';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedSection from '@/components/animations/AnimatedSection';
import ClientOnly from '@/components/ClientOnly';

export default function AnnouncementDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await announcementService.getById(parseInt(id));
        setAnnouncement(data);
        setLoading(false);
      } catch (err) {
        console.error('Duyuru detayları yüklenirken hata:', err);
        setError('Duyuru detayları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setLoading(false);
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
        <ClientOnly>
          <FadeIn direction="up" duration={0.8}>
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>
          </FadeIn>
        </ClientOnly>

        <ClientOnly>
          <AnimatedSection>
            <motion.article 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
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
                <div>
                  <motion.h1 
                    className="text-3xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {announcement.title}
                  </motion.h1>
                  <motion.div 
                    className="text-sm text-gray-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {announcement.date}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="prose max-w-none text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                dangerouslySetInnerHTML={{ __html: announcement.content }}
              />
            </motion.article>
          </AnimatedSection>
        </ClientOnly>
      </div>
    </div>
  );
} 