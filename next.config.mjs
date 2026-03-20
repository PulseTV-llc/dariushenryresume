/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for Vercel deployment
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Optimize output for Vercel
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // NO 'output: standalone' - This breaks Vercel routing!
};

export default nextConfig;
