/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
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
