import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        localPatterns: [
          {
            pathname: '/assets/img/**',
            search: '',
          },
        ],
      },
};

export default nextConfig;
