import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
        domains: ['media.istockphoto.com'],
        localPatterns: [
          {
            pathname: '/assets/img/**',
            search: '',
          },
        ],
      },
};

export default nextConfig;
