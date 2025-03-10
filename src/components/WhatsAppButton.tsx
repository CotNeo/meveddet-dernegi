'use client';

import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/905356869547" // WhatsApp numaranızı buraya ekleyin
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50"
      aria-label="WhatsApp Destek"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsAppButton; 