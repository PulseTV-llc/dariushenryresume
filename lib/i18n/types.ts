import type { IconName, Status } from '@/lib/site';

/**
 * Content model. Pages are data: a hero plus a list of typed sections,
 * rendered by components/site/PageView.tsx.
 *
 * Text may use two inline markers: **bold** and [[accent]] (brand gradient).
 *
 * Translators only translate text. Everything listed in NON_TEXT_KEYS always
 * comes from the English source (see lib/i18n/content.ts), so a translation
 * can never change structure, links, icons or status labels.
 */
export const NON_TEXT_KEYS = new Set([
  'type', 'id', 'tinted', 'flip', 'cols', 'icon', 'status', 'shot', 'phone', 'href', 'variant', 'compact', 'event',
]);

export type ShotKey =
  | 'dashboardSummary'
  | 'dashboardPanels'
  | 'doorActivity'
  | 'sensorCharts'
  | 'mobileDashboard'
  | 'restaurantFloor'
  | 'restaurantKitchen';

export interface LinkT {
  label: string;
  href: string;
}
export interface Cta extends LinkT {
  variant: 'primary' | 'secondary';
}
export interface Card {
  icon?: IconName;
  title: string;
  body: string;
  status?: Status;
}
export interface Note {
  title?: string;
  body: string;
}

interface Base {
  id?: string;
  tinted?: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export type Section =
  | (Base & { type: 'heroShots'; caption: string })
  | (Base & { type: 'stack'; link?: LinkT })
  | (Base & { type: 'cards'; cols: 2 | 3 | 4; items: Card[]; note?: Note; link?: LinkT })
  | (Base & { type: 'steps'; items: { title: string; body: string }[] })
  | (Base & { type: 'split'; flip?: boolean; body?: string; checks?: string[]; shot: ShotKey; phone?: boolean; link?: LinkT; note?: Note })
  | (Base & { type: 'sensors'; compact: boolean })
  | (Base & { type: 'connectivity' })
  | (Base & { type: 'industries' })
  | (Base & { type: 'products' })
  | (Base & { type: 'solutions'; other: { title: string; body: string; label: string }; restaurant: { eyebrow: string; label: string } })
  | (Base & { type: 'prose'; paragraphs: string[] })
  | (Base & { type: 'shot'; shot: ShotKey })
  | (Base & { type: 'note'; note: Note; link?: LinkT; linkLead?: string })
  | (Base & { type: 'findUs' })
  | (Base & { type: 'contact'; next: { title: string; items: string[] }; email: { title: string } });

export interface Page {
  meta: { title: string; description: string };
  hero: { eyebrow?: string; title: string; subtitle?: string; status?: Status; ctas?: Cta[] };
  sections: Section[];
  /** Closing call to action. Omit for the default; false for none. */
  cta?: { title: string; body: string } | false;
}

export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
