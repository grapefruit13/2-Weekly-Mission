/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'codeit-front.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'codeit-images.codeit.com',
        port: '',
        pathname: '/badges/**',
      },
      {
        protocol: 'https',
        hostname: 'codeit-frontend.codeit.com',
        port: '',
        pathname: '/static/images/brand/**',
      },
      {
        protocol: 'https',
        hostname: 'reactjs.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tanstack.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storybook.js.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'testing-library.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jasonwatmore.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'codeit.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
