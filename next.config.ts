import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'www.dodgeballeurope.org',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
       {
        protocol: 'https',
        hostname: 'worlddodgeballfederation.com', // Corrected hostname
        port: '',
        pathname: '/wdbf-content/uploads/**', // Corrected path prefix
      },


    ],
  },
};

export default nextConfig;
