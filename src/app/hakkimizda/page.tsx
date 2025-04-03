'use client';

import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedSection from '@/components/animations/AnimatedSection';
import ClientOnly from '@/components/ClientOnly';
import { motion } from 'framer-motion';

export default function Hakkimizda() {
  return (
    <div className="container mx-auto px-4 py-16">
      <ClientOnly>
        <FadeIn direction="up" duration={0.8}>
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hakkımızda
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-purple-600 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>
        </FadeIn>
      </ClientOnly>

      <div className="max-w-4xl mx-auto">
        <ClientOnly>
          <AnimatedSection>
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Sol Taraf - Görsel */}
                  <motion.div 
                    className="md:w-1/2"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <Image
                      src="/images/about.jpg"
                      alt="Meveddet Derneği"
                      width={500}
                      height={500}
                      className="rounded-lg"
                    />
                  </motion.div>
                  
                  {/* Sağ Taraf - İçerik */}
                  <motion.div 
                    className="md:w-1/2"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="space-y-6">
                      <motion.h2 
                        className="text-2xl font-bold text-gray-900"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        Meveddet Derneği
                      </motion.h2>
                      <motion.p 
                        className="text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        Meveddet Derneği, tasavvuf tarihini ve kültürünü araştırarak, 
                        doğru kaynaklarla tanıtmak ve gelecek nesillere aktarmak için çalışıyoruz.
                        Sevgi, saygı ve muhabbet temellerine dayanan bir anlayışla, 
                        manevi mirasımızın korunmasını sağlamayı amaçlıyoruz.
                      </motion.p>
                      <motion.p 
                        className="text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        Tasavvufun evrensel değerlerini günümüz dünyasına taşıyan,
                        sevgi ve hoşgörüyü merkeze alan bir topluluk oluşturmak. 
                        Kültürel ve akademik çalışmalarla Meveddet ruhunu yaşatmak, 
                        toplumda manevi derinliği artırmak ve tasavvufun ışığını 
                        daha geniş kitlelere ulaştırmak en büyük hedefimizdir.
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </ClientOnly>
      </div>
    </div>
  );
} 