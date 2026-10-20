/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.unsplash.com', 'plus.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/en',
        destination: '/',
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
