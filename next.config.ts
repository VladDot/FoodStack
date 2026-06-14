/** @type {import('next').NextConfig} */
import { NextConfig } from 'next';
import next_intl from 'next-intl/plugin';

const withNextIntl = next_intl('./src/i18n.ts');

process.env.TZ = 'Europe/Kyiv';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    localPatterns: [
      {
        pathname: '/assets/**',
      },
      {
        pathname: '/_next/static/media/**',
      },
      {
        pathname: '/src/assets/icons/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tildacdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
  // Suppress Google Fonts errors if offline
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default withNextIntl(nextConfig);
