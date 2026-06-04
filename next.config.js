/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["three"],
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "@react-three/drei"],
  },
  webpack: (config, { dev }) => {
    config.externals = config.externals || [];
    if (!dev) {
      // Disable source maps to save memory
      config.devtool = false;
    }
    return config;
  },
};

module.exports = nextConfig;
