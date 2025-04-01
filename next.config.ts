import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds:true,
  },
  typescript:{
    ignoreBuildErrors:true
  }
  ,  experimental: {
    serverActions: true, // Enables server actions
  },
  webpack: (config, { isServer }) => {
    // Monaco Editor requires special handling for workers in Next.js
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
      };
    }

    return config;
  }
};

export default nextConfig;
