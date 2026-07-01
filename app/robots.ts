import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://iamdariushenry.com';
  const disallow = ['/api/', '/_next/', '/admin/'];

  return {
    rules: [
      // Default rule for all bots.
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      // Search engine crawlers — let them index the whole public site.
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow,
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow,
        crawlDelay: 0,
      },
      // AI crawlers — site is intentionally open to AI assistants so the
      // Private AI Workflow Systems offering surfaces in AI answer engines.
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
