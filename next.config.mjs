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

  // Platform company site (2026-10). The site now leads with the monitoring
  // platform. Personal resume/portfolio URLs are gone for good (permanent).
  // Other retired marketing URLs use temporary redirects so they stay
  // reversible if a page is ever brought back.
  async redirects() {
    const gone = (source, destination) => ({ source, destination, permanent: true });
    const moved = (source, destination) => ({ source, destination, permanent: false });
    return [
      // Resume / portfolio
      gone('/about/founder', '/about'),
      gone('/ai-solutions', '/'),
      gone('/case-studies', '/'),
      gone('/case-studies/:slug', '/'),
      gone('/case-study-shyftgrid', '/'),
      gone('/blog', '/'),
      gone('/blog/:slug', '/'),

      // Restaurant OS / hospitality
      moved('/restaurants', '/solutions/restaurant-os'),
      moved('/systems/restaurant-os', '/solutions/restaurant-os'),
      moved('/industries/restaurant', '/solutions/restaurant-os'),
      moved('/industries/hospitality', '/solutions/restaurant-os'),
      moved('/platform/modules/touchboard', '/solutions/restaurant-os'),
      moved('/platform/modules/touchboard/demo', '/solutions/restaurant-os'),
      moved('/products/touchboard/demo', '/solutions/restaurant-os'),

      // Retired custom-systems funnel
      moved('/systems', '/solutions'),
      moved('/systems/:slug', '/solutions'),
      moved('/industries', '/solutions'),
      moved('/industries/:slug', '/solutions'),
      moved('/what-we-build', '/solutions'),
      moved('/platform/modules', '/products'),
      moved('/platform/modules/:slug', '/products'),
      moved('/hardware', '/products'),
      moved('/how-it-works', '/platform'),
      moved('/pricing', '/contact'),
      moved('/blueprint', '/contact'),
      moved('/demo', '/contact'),
      moved('/global/:market', '/'),
    ];
  },
};

export default nextConfig;
