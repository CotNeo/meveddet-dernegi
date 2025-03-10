'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';

interface BannerProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red';
  icon?: ReactNode;
  dismissible?: boolean;
}

const Banner = ({
  title,
  description,
  buttonText,
  buttonLink,
  color = 'blue',
  icon,
  dismissible = true,
}: BannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // Color variants
  const colorVariants = {
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

  const selectedColor = colorVariants[color];

  return (
    <div className={`${selectedColor.bg} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 flex items-center">
            {icon && <span className="flex p-2 rounded-lg">{icon}</span>}
            <div className="ml-3">
              <p className="font-medium">{title}</p>
              {description && <p className="text-sm text-white text-opacity-90">{description}</p>}
            </div>
          </div>
          
          {buttonText && buttonLink && (
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <Link
                href={buttonLink}
                className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${selectedColor.buttonText} ${selectedColor.buttonBg} ${selectedColor.buttonHover}`}
              >
                {buttonText}
              </Link>
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

export default Banner; 