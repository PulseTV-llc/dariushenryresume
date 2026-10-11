import type { Content } from './content';
import type { Page } from './types';
import { INDUSTRIES, RESTAURANT_OS_HREF, type IndustrySlug } from '@/lib/site';

/** An industry page is assembled from the catalog words plus shared labels. */
export function industryPage(c: Content, slug: IndustrySlug): Page {
  const t = c.catalog.industries[slug];
  const l = c.pages.industry;
  const reg = INDUSTRIES.find((i) => i.slug === slug)!;
  return {
    meta: { title: l.metaTitle.replace('{name}', t.name), description: t.summary },
    hero: {
      eyebrow: `${l.eyebrowPrefix} · ${t.short}`,
      title: t.headline,
      subtitle: t.summary,
      ctas: [
        { label: l.primary, href: '/contact', variant: 'primary' },
        { label: l.secondary, href: '/platform', variant: 'secondary' },
      ],
    },
    sections: [
      {
        type: 'cards',
        cols: 3,
        eyebrow: l.monitor.eyebrow,
        title: l.monitor.title,
        items: t.monitor.map((m, i) => ({ ...m, status: reg.monitorStatus[i] })),
      },
      { type: 'cards', tinted: true, cols: 3, eyebrow: l.how.eyebrow, title: l.how.title, items: t.how },
      { type: 'shot', shot: 'doorActivity' },
      { type: 'stack', tinted: true, eyebrow: l.stack.eyebrow, title: l.stack.title },
      {
        type: 'note',
        note: { body: t.note },
        ...(slug === 'food-service-cold-chain'
          ? { linkLead: l.restaurantLead, link: { label: c.catalog.restaurantOs.name, href: RESTAURANT_OS_HREF } }
          : {}),
      },
    ],
  };
}
