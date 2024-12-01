import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.giallozafferano.it', 'media.istockphoto.com'],
    // Remove localPatterns as it's not a valid config option
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.giallozafferano.it',
        port: '',
        pathname: '/images/**', // Use /** to match any path under /images/
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
    })
    
    // Ignora gli errori delle source maps
    config.ignoreWarnings = [
      { module: /node_modules\// },
      { message: /Failed to parse source map/ },
      { message: /contains unsupported "URL" field/ }
    ]

    return config
  }
};

export default nextConfig;