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
  // platform. Since the site went live (2026-10-14) every retired URL, the
  // personal resume/portfolio ones and the old marketing ones, redirects
  // permanently with 301 (statusCode instead of Next's default 308).
  // The admin host is never for search engines, whatever path is asked for (pages, /admin, /api, files).
  async headers() {
    return [{ source: '/:path*', has: [{ type: 'host', value: process.env.ADMIN_HOST ?? 'admin.vexaos.io' }], headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },

  async redirects() {
    const gone = (source, destination) => ({ source, destination, statusCode: 301 });
    const moved = (source, destination) => ({ source, destination, statusCode: 301 });
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
