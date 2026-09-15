import { MetadataRoute } from 'next';
import { PRODUCTS, SITE_URL } from '@/lib/vexaos';
import { INDUSTRIES } from '@/lib/marketing/industries';
import { SYSTEMS } from '@/lib/marketing/systems';
import { CASE_STUDIES } from '@/lib/marketing/case-studies';
import { MARKETS } from '@/lib/marketing/global';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; freq: 'weekly' | 'monthly' }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/solutions', priority: 0.95, freq: 'monthly' },
    { path: '/systems', priority: 0.95, freq: 'monthly' },
    ...SYSTEMS.map((s) => ({ path: `/systems/${s.slug}`, priority: 0.85, freq: 'monthly' as const })),
    { path: '/industries', priority: 0.9, freq: 'monthly' },
    ...INDUSTRIES.map((i) => ({ path: `/industries/${i.slug}`, priority: 0.85, freq: 'monthly' as const })),
    { path: '/platform', priority: 0.85, freq: 'monthly' },
    ...PRODUCTS.map((p) => ({ path: `/platform/modules/${p.slug}`, priority: 0.6, freq: 'monthly' as const })),
    { path: '/platform/modules/touchboard/demo', priority: 0.6, freq: 'monthly' },
    { path: '/pricing', priority: 0.9, freq: 'monthly' },
    { path: '/blueprint', priority: 0.9, freq: 'monthly' },
    { path: '/how-it-works', priority: 0.75, freq: 'monthly' },
    { path: '/contact', priority: 0.9, freq: 'monthly' },
    { path: '/demo', priority: 0.7, freq: 'monthly' },
    { path: '/hardware', priority: 0.7, freq: 'monthly' },
    { path: '/case-studies', priority: 0.75, freq: 'monthly' },
    ...CASE_STUDIES.map((c) => ({ path: `/case-studies/${c.slug}`, priority: 0.65, freq: 'monthly' as const })),
    // Campaign pages only once localized and marked indexable.
    ...MARKETS.filter((m) => m.indexable).map((m) => ({ path: `/global/${m.slug}`, priority: 0.6, freq: 'monthly' as const })),
    { path: '/about', priority: 0.7, freq: 'monthly' },
    { path: '/about/founder', priority: 0.6, freq: 'monthly' },
    { path: '/blog', priority: 0.6, freq: 'weekly' },
    { path: '/blog/restaurant-cafe-vexaos-system', priority: 0.6, freq: 'monthly' },
    { path: '/blog/barbershop-salon-vexaos-system', priority: 0.6, freq: 'monthly' },
    { path: '/blog/how-i-built-zonely', priority: 0.3, freq: 'monthly' },
    { path: '/blog/7-day-mvp-guide', priority: 0.3, freq: 'monthly' },
    { path: '/blog/rescuing-broken-apps', priority: 0.3, freq: 'monthly' },
    { path: '/ai-solutions', priority: 0.3, freq: 'monthly' },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path === '/' ? '' : r.path}`,
    lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
