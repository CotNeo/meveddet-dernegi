'use client';

import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: 'https://www.facebook.com/people/Meveddet-Tarih-ve-K%C3%BClt%C3%BCr-Ara%C5%9Ft%C4%B1rmalar%C4%B1-Derne%C4%9Fi/61571926373167/?_rdr' },
    { name: 'YouTube', icon: FaYoutube, href: 'https://www.youtube.com/channel/UCAMYw9sMwGKI13OkLRhSNnQ' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/meveddetdernegi' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/meveddet_dernegi/' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <Image 
                src="/logo_transparent.png"
                alt="Meveddet Derneği Logo" 
                width={50} 
                height={50} 
                className="mr-3"
              />
              <h3 className="text-xl font-bold">Meveddet Derneği</h3>
            </div>
            <p className="text-gray-300">
              Tasavvufun sevgi ve muhabbet temelli mirasını araştırmak, korumak ve aktarmak.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-white transition">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/faaliyetler" className="text-gray-300 hover:text-white transition">
                  Faaliyetler
                </Link>
              </li>
              <li>
                <Link href="/duyurular" className="text-gray-300 hover:text-white transition">
                  Duyurular
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-white transition">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <div className="space-y-2 text-gray-300">
              <p>Adres: Bursa, Türkiye</p>
              <p>Telefon: +90 535 686 95 47</p>
              <p>E-posta: info@meveddetdernegi.org</p>
            </div>

            {/* Social Media Links */}
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition"
                    aria-label={`${link.name} sayfamızı ziyaret et`}
                    title={`${link.name} sayfamızı ziyaret et`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Meveddet Derneği. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 