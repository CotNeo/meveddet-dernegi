'use client';

import Form from '@/components/Form';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedSection from '@/components/animations/AnimatedSection';
import ClientOnly from '@/components/ClientOnly';

export default function ContactPage() {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.329829238781!2d28.981189!3d40.205166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca169eb273cf45%3A0xdaa026ebf17d2dcc!2sNil%C3%BCfer+Municipality+Association+of+Campus!5e0!3m2!1str!2str!4v1710095438777!5m2!1str!2str";

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ClientOnly>
          <FadeIn direction="up" duration={0.8}>
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">İletişim</h1>
              <p className="text-lg text-gray-600">
                Bizimle iletişime geçmek için aşağıdaki formu doldurabilir veya iletişim bilgilerimizi kullanabilirsiniz.
              </p>
            </div>
          </FadeIn>
        </ClientOnly>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ClientOnly>
            <AnimatedSection delay={0.2}>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">İletişim Bilgileri</h2>
                  <div className="ml-4">
                    <Image 
                      src="/logo.png" 
                      alt="Meveddet Derneği Logo" 
                      width={30} 
                      height={30} 
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-purple-600 h-6 w-6 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Adres</h3>
                      <p className="mt-1 text-gray-600">
                        Konak Mahallesi, Seçkin 120 Sokak ,Dış Kapı No:23
                        Konak Kapalıpazar Al.Dernekler Yerleşkesi, iç Kapı No:1
                        Nilüfer/Bursa
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaPhone className="text-purple-600 h-6 w-6 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Telefon</h3>
                      <p className="mt-1 text-gray-600">+90 535 686 95 47</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaEnvelope className="text-purple-600 h-6 w-6 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">E-posta</h3>
                      <p className="mt-1 text-gray-600">info@meveddetdernegi.org</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Konum</h3>
                  <div className="aspect-w-16 aspect-h-9 bg-white">
                    <iframe
                      src={mapUrl}
                      width="100%"
                      height="300"
                      className="rounded-lg border-0"
                      allowFullScreen
                      loading="lazy"
                      title="Dernek Konumu Haritası"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </ClientOnly>

          {/* Contact Form */}
          <ClientOnly>
            <AnimatedSection delay={0.4}>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Formu</h2>
                <Form />
              </div>
            </AnimatedSection>
          </ClientOnly>
        </div>
      </div>
    </div>
  );
} 