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
    // Keep headless-chromium packages out of the webpack bundle so the
    // serverless PDF route (/api/quote-pdf) loads Chromium's binary correctly.
    serverComponentsExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  },
  // NO 'output: standalone' - This breaks Vercel routing!

  // VexaOS repositioning: the site no longer sells products or plans.
  // The old SKU/pricing/platform pages funnel into the custom-systems story.
  // 307 (temporary) so this is reversible if any page is later repositioned
  // rather than retired.
  async redirects() {
    return [
      { source: '/pricing', destination: '/contact', permanent: false },
      { source: '/products', destination: '/what-we-build', permanent: false },
      { source: '/products/:path*', destination: '/what-we-build', permanent: false },
      { source: '/platform', destination: '/how-it-works', permanent: false },
    ];
  },
};

export default nextConfig;
