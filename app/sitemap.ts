import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.vexaos.io';
  const currentDate = new Date();

  const routes: { path: string; priority: number; freq: 'weekly' | 'monthly' }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/industries', priority: 0.9, freq: 'monthly' },
    { path: '/systems', priority: 0.9, freq: 'monthly' },
    { path: '/pricing', priority: 0.9, freq: 'monthly' },
    { path: '/case-study-shyftgrid', priority: 0.8, freq: 'monthly' },
    { path: '/ai-solutions', priority: 0.7, freq: 'monthly' },
    { path: '/contact', priority: 0.95, freq: 'monthly' },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path === '/' ? '' : r.path}`,
    lastModified: currentDate,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
