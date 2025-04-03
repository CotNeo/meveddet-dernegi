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

      {/* Vision and Mission Cards */}
      <div className="max-w-7xl mx-auto mt-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
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
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Vizyonumuz</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Tasavvufun evrensel değerlerini günümüz dünyasına taşıyan, sevgi ve hoşgörüyü merkeze alan bir topluluk oluşturmak. Kültürel ve akademik çalışmalarla Meveddet ruhunu yaşatmak, toplumda manevi derinliği artırmak ve tasavvufun ışığını daha geniş kitlelere ulaştırmak.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </ClientOnly>

          {/* Mission Card */}
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
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Misyonumuz</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Tasavvuf tarihini ve kültürünü araştırarak, doğru kaynaklarla tanıtmak ve gelecek nesillere aktarmak. Sevgi, saygı ve muhabbet temellerine dayanan bir anlayışla, manevi mirasımızın korunmasını sağlamak ve toplumsal dayanışmayı güçlendirmek.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </ClientOnly>
        </div>
      </div>
    </div>
  );
} 