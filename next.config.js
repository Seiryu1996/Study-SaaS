/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['prisma'],
  },
  webpack: (config, { dev }) => {
    // Monaco Editor requires special webpack configuration
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' }
    });
    
    // WebAssembly/Pyodide support
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    
    // Enable WebAssembly experiments
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    
    // Hot reload optimization for development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    
    return config;
  },
  // Enable hot reloading for development
  reactStrictMode: true,
  swcMinify: true,
  // Hot reload optimization
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Fix for Clerk in Docker environment
  async rewrites() {
    return [
      {
        source: '/clerk/:path*',
        destination: '/api/clerk/:path*',
      },
    ];
  },
}

module.exports = nextConfig