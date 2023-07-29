/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
    ],
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
};

module.exports = nextConfig;
