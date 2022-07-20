/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        readline: false,
        path: false,
        os: false,
      },
    };
    return config;
  },
};

module.exports = nextConfig;
