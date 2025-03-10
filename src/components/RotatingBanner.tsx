'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';

interface BannerItem {
  id: number;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  color: 'purple' | 'blue' | 'green' | 'yellow' | 'red';
  icon?: ReactNode;
}

interface RotatingBannerProps {
  items: BannerItem[];
  interval?: number; // Rotation interval in milliseconds
  dismissible?: boolean;
}

const RotatingBanner = ({
  items,
  interval = 5000, // Default to 5 seconds
  dismissible = true,
}: RotatingBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, items.length, interval]);

  if (!isVisible || items.length === 0) return null;

  const currentItem = items[currentIndex];

  // Color variants
  const colorVariants = {
    purple: {
      bg: 'bg-purple-600',
      hoverBg: 'hover:bg-purple-700',
      buttonBg: 'bg-white',
      buttonText: 'text-purple-600',
      buttonHover: 'hover:bg-purple-50',
    },
    blue: {
      bg: 'bg-blue-600',
      hoverBg: 'hover:bg-blue-700',
      buttonBg: 'bg-white',
      buttonText: 'text-blue-600',
      buttonHover: 'hover:bg-blue-50',
    },
    green: {
      bg: 'bg-green-600',
      hoverBg: 'hover:bg-green-700',
      buttonBg: 'bg-white',
      buttonText: 'text-green-600',
      buttonHover: 'hover:bg-green-50',
    },
    yellow: {
      bg: 'bg-yellow-500',
      hoverBg: 'hover:bg-yellow-600',
      buttonBg: 'bg-white',
      buttonText: 'text-yellow-600',
      buttonHover: 'hover:bg-yellow-50',
    },
    red: {
      bg: 'bg-red-600',
      hoverBg: 'hover:bg-red-700',
      buttonBg: 'bg-white',
      buttonText: 'text-red-600',
      buttonHover: 'hover:bg-red-50',
    },
  };

  const selectedColor = colorVariants[currentItem.color];

  return (
    <div className={`${selectedColor.bg} text-white transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 flex items-center">
            {currentItem.icon && <span className="flex p-2 rounded-lg">{currentItem.icon}</span>}
            <div className="ml-3">
              <p className="font-medium">{currentItem.title}</p>
              {currentItem.description && (
                <p className="text-sm text-white text-opacity-90">{currentItem.description}</p>
              )}
            </div>
          </div>

          {currentItem.buttonText && currentItem.buttonLink && (
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <Link
                href={currentItem.buttonLink}
                className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${selectedColor.buttonText} ${selectedColor.buttonBg} ${selectedColor.buttonHover}`}
              >
                {currentItem.buttonText}
              </Link>
            </div>
          )}

          {/* Navigation dots */}
          {items.length > 1 && (
            <div className="hidden sm:flex items-center space-x-1 mx-4">
              {items.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to announcement ${index + 1}`}
                />
              ))}
            </div>
          )}

          {dismissible && (
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                className={`-mr-1 flex p-2 rounded-md ${selectedColor.hoverBg} focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2`}
                onClick={() => setIsVisible(false)}
              >
                <span className="sr-only">Kapat</span>
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RotatingBanner; 