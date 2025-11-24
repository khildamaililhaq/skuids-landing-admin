/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'id', 'hi', 'zh'],
    defaultLocale: 'id',
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'tstfupwelkoiorjaelgs.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
