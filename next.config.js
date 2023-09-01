/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    // environment: "production",
    // environment: "development",
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [];
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // config.plugins.push({
    //   plugin: cracoBabelLoader,
    //   options: {
    //     includes: [
    //       resolvePackage("node_modules/@stafihub/apps-util"),
    //       resolvePackage("node_modules/@stafihub/apps-wallet"),
    //       resolvePackage("node_modules/@stafihub/types"),
    //     ],
    //   },
    // });
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
