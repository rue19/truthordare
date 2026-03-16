/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    config.externals.push('canvas', 'fs');
    return config;
  },
};

module.exports = nextConfig;
