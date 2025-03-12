/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  // Eğer statik export kullanılacaksa:
  // output: 'export',
  // Netlify için gerekli ayarlar
  target: 'serverless',
};

module.exports = nextConfig; 