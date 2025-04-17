'use client';

import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import ClientOnly from '@/components/ClientOnly';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Faaliyetler() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <ClientOnly>
        <FadeIn direction="up" duration={0.8}>
          <div className="text-center mb-12">
            <motion.h1 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Faaliyetlerimiz
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-purple-600 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </div>
        </FadeIn>
      </ClientOnly>
      {/* Nevruz-i Sultani */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Nevruz-i Sultani</h2>
            <div className="w-16 h-0.5 bg-purple-600 mx-auto"></div>
          </motion.div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Ana Resim */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full group cursor-pointer overflow-hidden"
              onClick={() => openImageModal('/images/nevruz-main.jpg')}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/images/nevruz-main.jpg"
                  alt="Nevruz-i Sultani"
                  width={800}
                  height={400}
                  className="w-full rounded-t-xl max-h-[350px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/80 text-gray-800 px-4 py-2 rounded-full backdrop-blur-sm">
                    Görseli Büyüt
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Küçük Resimler Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-3 gap-3 p-4"
            >
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="aspect-square cursor-pointer overflow-hidden rounded-lg relative group"
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  onClick={() => openImageModal(`/images/nevruz-${index}.jpg`)}
                >
                  <Image
                    src={`/images/nevruz-${index}.jpg`}
                    alt={`Nevruz-i Sultani ${index}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>

            {/* İçerik */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-6 bg-gray-50"
            >
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                NEVRUZ-İ SULTÂNÎ PROGRAMI
                <span className="block text-lg font-normal text-gray-600 mt-2">22 Mart 2025</span>
              </motion.h3>
              <div className="space-y-4 text-gray-700">
                <motion.p 
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Nevruz-i Sultânî, Osmanlı İmparatorluğu'nda yılbaşı olarak kabul edilen ve Sultan III. Murad tarafından resmi bayram ilan edilen önemli bir gündür. Bu gün, baharın başlangıcını ve yeni yılın gelişini kutlamak için çeşitli etkinliklerle kutlanır.
                </motion.p>

                <motion.h3 
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Program İçeriği:
                </motion.h3>
                <motion.ul 
                  className="list-disc pl-6 mb-4 space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <li>Açılış konuşması: Can Ulusoy</li>
                  <li>Osmanlı Tekkelerinde Nevruz: Kahraman Özkök</li>
                  <li>Mevlid-i Ali: İsa Nesim</li>
                  <li>İlahi ve Nefesler: Bursa Mevlevîhanesi Mûsikî Topluluğu</li>
                  <li>Nevruz Sütü İkramı</li>
                </motion.ul>

                <motion.h3 
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Etkinlik Detayları:
                </motion.h3>
                <motion.ul 
                  className="list-disc pl-6 mb-4 space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <li><strong>Tarih:</strong> 22 Mart Cumartesi</li>
                  <li><strong>Saat:</strong> 15:30</li>
                  <li><strong>Yer:</strong> Bursa Mevlevîhanesi ve Müzesi</li>
                </motion.ul>

                <motion.p 
                  className="italic text-gray-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Tüm dostlarımızı bekleriz.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nevruz-i Sultani Videoları */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Nevruz-i Sultani Videoları</h2>
            <div className="w-16 h-0.5 bg-purple-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLY3SufQLgEGMz_VkuNkzPhGJp9ZcIN6Ii"
                title="Nevruz-i Sultani Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-6 bg-gray-50">
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                NEVRUZ-İ SULTÂNÎ VİDEOLARI
              </motion.h3>
              <p className="text-gray-700">
                Nevruz-i Sultani etkinliklerimizin videolarını buradan izleyebilirsiniz. Tüm videoları oynatma listesinden seçebilir ve izleyebilirsiniz.
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Prof. Dr. Hüseyin Hatemi Söyleşi */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Prof. Dr. Hüseyin Hatemi ile Söyleşi</h2>
            <div className="w-16 h-0.5 bg-purple-600 mx-auto"></div>
          </motion.div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Ana Resim */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full group cursor-pointer overflow-hidden"
              onClick={() => openImageModal('/images/hatemi-main.jpg')}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/images/hatemi-main.jpg"
                  alt="Prof. Dr. Hüseyin Hatemi"
                  width={800}
                  height={400}
                  className="w-full rounded-t-xl max-h-[350px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/80 text-gray-800 px-4 py-2 rounded-full backdrop-blur-sm">
                    Görseli Büyüt
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* YouTube Playlist */}
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLY3SufQLgEGPmraJgSvM4VDzeu_0JSVZS"
                title="Prof. Dr. Hüseyin Hatemi Söyleşi Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* İçerik */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-6 bg-gray-50"
            >
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                PROF. DR. HÜSEYİN HATEMİ İLE SÖYLEŞİ
              </motion.h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Prof. Dr. Hüseyin Hatemi ile gerçekleştirdiğimiz söyleşi serisini buradan izleyebilirsiniz. 
                  Tüm videoları oynatma listesinden seçebilir ve izleyebilirsiniz.
                </p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-6 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {[
                      { label: "Tarih", value: "10 Nisan 2025" },
                      { label: "Saat", value: "15:00" },
                      { label: "Yer", value: "Bursa Mevlevîhanesi ve Müzesi" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index + 0.6 }}
                        className="hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
                      >
                        <span className="block text-gray-500 text-sm">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resim Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[80vh] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={selectedImage}
                  alt="Büyük Görsel"
                  width={1600}
                  height={900}
                  className="w-full h-full object-contain bg-black"
                  priority
                />
              </motion.div>
              <motion.button
                className="absolute top-4 right-4 bg-white/90 text-black rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                onClick={closeImageModal}
                aria-label="Görseli Kapat"
                title="Görseli Kapat"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 