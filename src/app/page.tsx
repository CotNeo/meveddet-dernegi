'use client';

import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedSection from '@/components/animations/AnimatedSection';
import HoverScale from '@/components/animations/HoverScale';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <FadeIn direction="up" duration={0.8}>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Meveddet Derneği
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} duration={0.8}>
            <p className="text-xl md:text-2xl text-center mb-10 max-w-3xl">
            Meveddet Derneği olarak, tasavvuf tarihini ve kültürünü araştırarak, 
            doğru kaynaklarla tanıtmak ve gelecek nesillere aktarmak için çalışıyoruz.
             Sevgi, saygı ve muhabbet temellerine dayanan bir anlayışla, manevi mirasımızın korunmasını sağlamayı amaçlıyoruz.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.4} duration={0.8}>
            <div className="flex flex-wrap gap-4 justify-center">
              <HoverScale>
                <Link
                  href="/hakkimizda"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition duration-300"
                >
                  Hakkımızda
                </Link>
              </HoverScale>
              <HoverScale>
                <Link
                  href="/iletisim"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-md font-medium transition duration-300"
                >
                  Bize Ulaşın
                </Link>
              </HoverScale>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Misyon ve Vizyon */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Misyonumuz ve Vizyonumuz</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection delay={0.2}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
                <p className="text-gray-600">
                Meveddet Derneği olarak, tasavvuf tarihini ve kültürünü araştırarak, 
                doğru kaynaklarla tanıtmak ve gelecek nesillere aktarmak için çalışıyoruz.
                 Sevgi, saygı ve muhabbet temellerine dayanan bir anlayışla, manevi mirasımızın korunmasını sağlamayı amaçlıyoruz.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
                <p className="text-gray-600">
                Tasavvufun evrensel değerlerini günümüz dünyasına taşıyan,
                sevgi ve hoşgörüyü merkeze alan bir topluluk oluşturmak. 
                Kültürel ve akademik çalışmalarla Meveddet ruhunu yaşatmak, 
                toplumda manevi derinliği artırmak ve tasavvufun ışığını daha geniş kitlelere ulaştırmak en büyük hedefimizdir.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
