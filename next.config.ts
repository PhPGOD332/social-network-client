import type { NextConfig } from "next";

const NEXT_PUBLIC_API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: NEXT_PUBLIC_API_HOSTNAME,
        port: '',
        pathname: '/data/images/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
