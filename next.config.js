/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: false,
  env: {
    // environment: "production",
    // environment: "development",
  },
  images: {
    unoptimized: true,
  },
  // async redirects() {
  //   return [];
  // },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
