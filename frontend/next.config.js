/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const isProd = process.env.NODE_ENV === 'production';
    const backendUrl =
      process.env.BACKEND_URL ||
      (isProd ? 'https://algoquest-api.vercel.app' : 'http://localhost:5000');
    return [
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

