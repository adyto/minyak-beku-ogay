/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minyak-beku-server.up.railway.app',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
