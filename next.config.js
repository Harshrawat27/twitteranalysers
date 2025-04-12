/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com', 'pbs.twimg.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.twimg.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
