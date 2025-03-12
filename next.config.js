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
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://meveddet-dernegi.netlify.app' : '',
};

module.exports = nextConfig; 