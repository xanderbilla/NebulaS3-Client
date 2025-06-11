import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize bundle size
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-select",
    ],
  },

  // Enable webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize bundle splitting
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            enforce: true,
          },
          common: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: "lucide",
            chunks: "all",
            enforce: true,
          },
        },
      };

      // Tree shake unused exports
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    return config;
  },

  // Reduce bundle size by removing console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Output optimization
  poweredByHeader: false,

  // Compression and performance
  compress: true,
};

export default nextConfig;
