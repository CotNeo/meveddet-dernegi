'use client';

import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedSection from '@/components/animations/AnimatedSection';

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" duration={0.8}>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hakkımızda</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meveddet Derneği, tasavvufun sevgi, saygı ve muhabbet temelli mirasını yaşatmak amacıyla kurulmuştur. 
              Derneğimiz, tasavvuf tarihini ve kültürünü araştırarak, bu değerleri doğru kaynaklarla tanıtmayı ve 
              gelecek nesillere aktarmayı hedeflemektedir.
            </p>
          </div>
        </FadeIn>

        {/* Tarihçe */}
        <section className="mb-20">
          <AnimatedSection delay={0.2}>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Haftanın Özlü Sözü</h2>
                <div className="ml-4">
                  <Image 
                    src="/logo.png" 
                    alt="Meveddet Derneği Logo" 
                    width={30} 
                    height={30} 
                  />
                </div>
              </div>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  Muhabbet, gönülleri birleştiren ilahi bir bağdır. – Mevlânâ
                </p>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </div>
  );
} 