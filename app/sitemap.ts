import { MetadataRoute } from 'next';
import { INDUSTRIES, PRODUCTS, RESTAURANT_OS, SITE_URL, industryHref, productHref } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: '/', priority: 1.0 },
    { path: '/platform', priority: 0.9 },
    { path: '/products', priority: 0.9 },
    ...PRODUCTS.map((p) => ({ path: productHref(p.slug), priority: 0.8 })),
    { path: '/solutions', priority: 0.9 },
    ...INDUSTRIES.map((i) => ({ path: industryHref(i.slug), priority: 0.8 })),
    { path: RESTAURANT_OS.href, priority: 0.6 },
    { path: '/about', priority: 0.6 },
    { path: '/contact', priority: 0.8 },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path === '/' ? '' : r.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: r.priority,
  }));
}
