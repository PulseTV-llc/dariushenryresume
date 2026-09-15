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

  // Custom business OS repositioning (2026-09). Retired product/SKU URLs
  // funnel into the platform module pages and the custom-systems story.
  // 307 (temporary) keeps this reversible if the modules are productized later.
  async redirects() {
    return [
      // Order matters: specific paths before the catch-all.
      { source: '/products/touchboard/demo', destination: '/platform/modules/touchboard/demo', permanent: false },
      { source: '/products', destination: '/platform#modules', permanent: false },
      { source: '/products/:slug', destination: '/platform/modules/:slug', permanent: false },
      { source: '/platform/modules', destination: '/platform#modules', permanent: false },
      { source: '/what-we-build', destination: '/solutions', permanent: false },
      { source: '/case-study-shyftgrid', destination: '/case-studies/shyftgrid', permanent: false },
    ];
  },
};

export default nextConfig;
