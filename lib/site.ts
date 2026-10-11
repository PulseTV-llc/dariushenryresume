/**
 * Site-wide constants and the structural registries for products and
 * industries. All words live in content/<locale>/; this file holds only what
 * must be identical in every language (slugs, icons, availability).
 *
 * HONESTY RULES: `status` here is the single source of truth for what is
 * available, in development or coming soon. Never mark something 'available'
 * unless it works on the platform today.
 */

export const SITE_URL = 'https://www.vexaos.io';
export const CONTACT_EMAIL = 'support@vexaos.io';
export const ADDRESS = {
  street: '35 W. Huron St, Suite 403',
  city: 'Pontiac',
  region: 'MI',
  postalCode: '48342',
  country: 'US',
  mapsUrl: 'https://maps.google.com/?q=35+W.+Huron+St+Suite+403+Pontiac+MI+48342',
} as const;

export type Status = 'available' | 'development' | 'soon';

export type IconName =
  | 'sensors' | 'gateway' | 'mobile' | 'cloud' | 'apps' | 'thermometer' | 'door' | 'vibration' | 'plug'
  | 'food' | 'warehouse' | 'factory' | 'building' | 'health' | 'restaurant' | 'environment' | 'water'
  | 'energy' | 'assets' | 'safety' | 'process' | 'wired' | 'bluetooth' | 'wifi';

export const PRODUCTS = [
  { slug: 'sensors', icon: 'sensors', status: 'available' },
  { slug: 'edge-gateway', icon: 'gateway', status: 'available' },
  { slug: 'mobile-gateway', icon: 'mobile', status: 'soon' },
  { slug: 'cloud-ai-insights', icon: 'cloud', status: 'available' },
  { slug: 'apps', icon: 'apps', status: 'available' },
] as const satisfies readonly { slug: string; icon: IconName; status: Status }[];
export type ProductSlug = (typeof PRODUCTS)[number]['slug'];

export const INDUSTRIES = [
  { slug: 'food-service-cold-chain', icon: 'food', primary: true, monitorStatus: [] },
  { slug: 'warehouses-logistics', icon: 'warehouse', primary: true, monitorStatus: [undefined, undefined, 'soon'] },
  { slug: 'manufacturing-machine-health', icon: 'factory', primary: true, monitorStatus: [undefined, undefined, 'development'] },
  { slug: 'facilities-property', icon: 'building', primary: false, monitorStatus: [] },
  { slug: 'healthcare-pharma-storage', icon: 'health', primary: false, monitorStatus: [] },
] as const satisfies readonly { slug: string; icon: IconName; primary: boolean; monitorStatus: readonly (Status | undefined)[] }[];
export type IndustrySlug = (typeof INDUSTRIES)[number]['slug'];

export const productHref = (slug: string) => `/products/${slug}`;
export const industryHref = (slug: string) => `/solutions/${slug}`;
export const RESTAURANT_OS_HREF = '/solutions/restaurant-os';

/** Every public path, without a locale prefix. Used by the sitemap and hreflang. */
export const PATHS: { path: string; priority: number }[] = [
  { path: '/', priority: 1.0 },
  { path: '/platform', priority: 0.9 },
  { path: '/products', priority: 0.9 },
  ...PRODUCTS.map((p) => ({ path: productHref(p.slug), priority: 0.8 })),
  { path: '/solutions', priority: 0.9 },
  ...INDUSTRIES.map((i) => ({ path: industryHref(i.slug), priority: 0.8 })),
  { path: RESTAURANT_OS_HREF, priority: 0.6 },
  { path: '/about', priority: 0.6 },
  { path: '/contact', priority: 0.8 },
];

export const OG_IMAGES = [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'VexaOs: monitor anything, anywhere.' }];
