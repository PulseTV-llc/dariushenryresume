/**
 * International delivery.
 *
 * REGIONS are markets VexaOS delivers to — NOT a list of client locations.
 * Never add copy implying existing customers in a region unless that is true.
 *
 * Capability wording is deliberately "-ready" / "-capable": localization,
 * multi-currency, tax, and regional compliance are configured per engagement,
 * not claimed as complete out-of-the-box features.
 */

export interface Region {
  name: string;
  /** Approximate UTC offset used to place the region on the time-zone band. */
  utc: number;
  utcLabel: string;
}

export const REGIONS: Region[] = [
  { name: 'United States', utc: -6.5, utcLabel: 'UTC−8 to −5' },
  { name: 'Canada', utc: -5, utcLabel: 'UTC−8 to −3:30' },
  { name: 'United Kingdom', utc: 0, utcLabel: 'UTC+0' },
  { name: 'Europe', utc: 1.5, utcLabel: 'UTC+1 to +2' },
  { name: 'UAE & Middle East', utc: 3.5, utcLabel: 'UTC+3 to +4' },
  { name: 'Thailand & SE Asia', utc: 7, utcLabel: 'UTC+7' },
  { name: 'Singapore', utc: 8, utcLabel: 'UTC+8' },
  { name: 'Australia', utc: 9.5, utcLabel: 'UTC+8 to +10' },
];

export const GLOBAL_CAPABILITIES: { title: string; detail: string; icon: string }[] = [
  { title: 'Remote discovery', detail: 'Discovery and Blueprint sessions run remotely, scheduled to overlap your business hours.', icon: 'Video' },
  { title: 'International deployments', detail: 'Systems designed, built, and launched for organizations outside the United States.', icon: 'Globe' },
  { title: 'Multi-location support', detail: 'One organization model spanning sites, regions, and brands.', icon: 'Building2' },
  { title: 'Multi-time-zone architecture', detail: 'Schedules, timestamps, and reporting that respect each location’s local time.', icon: 'Clock' },
  { title: 'Multi-currency capable', detail: 'Data model designed to carry currency per organization and location.', icon: 'Coins' },
  { title: 'Localization-ready UI', detail: 'Interfaces structured for translation and regional formats.', icon: 'Languages' },
  { title: 'Regional configuration', detail: 'Can be configured for regional requirements such as tax, labor, and data rules.', icon: 'SlidersHorizontal' },
  { title: 'Global infrastructure', detail: 'Cloud infrastructure selected to suit where your users and data are.', icon: 'Server' },
  { title: 'International remote support', detail: 'Managed platform support delivered remotely across time zones.', icon: 'LifeBuoy' },
];

/* -------------------------------------------------------------- */
/* Country campaign landing pages — /global/[market]              */
/* -------------------------------------------------------------- */

/**
 * Campaign landing pages for country-targeted advertising.
 *
 * Pages are generated for every entry here but ship `noindex` and stay out of
 * the sitemap until `indexable` is set — flip it only once the page has
 * genuinely localized content (not just a swapped country name).
 */
export interface Market {
  slug: string;
  country: string;
  /** Name as it reads mid-sentence, e.g. "the United Kingdom". */
  inSentence: string;
  region: string;
  timeZoneNote: string;
  /** Industries worth leading with in campaign copy for this market. */
  focusIndustries: string[];
  indexable: boolean;
}

export const MARKETS: Market[] = [
  {
    slug: 'uk',
    country: 'United Kingdom',
    inSentence: 'the United Kingdom',
    region: 'Europe',
    timeZoneNote: 'Working sessions scheduled across UK business hours.',
    focusIndustries: ['restaurant', 'hospitality', 'cleaning-facility-services', 'multi-site'],
    indexable: false,
  },
  {
    slug: 'uae',
    country: 'United Arab Emirates',
    inSentence: 'the UAE',
    region: 'Middle East',
    timeZoneNote: 'Working sessions scheduled to overlap Gulf business hours.',
    focusIndustries: ['hospitality', 'restaurant', 'property-management', 'healthcare'],
    indexable: false,
  },
  {
    slug: 'singapore',
    country: 'Singapore',
    inSentence: 'Singapore',
    region: 'Southeast Asia',
    timeZoneNote: 'Working sessions scheduled to overlap Singapore business hours.',
    focusIndustries: ['restaurant', 'retail', 'cleaning-facility-services', 'multi-site'],
    indexable: false,
  },
  {
    slug: 'thailand',
    country: 'Thailand',
    inSentence: 'Thailand',
    region: 'Southeast Asia',
    timeZoneNote: 'Working sessions scheduled to overlap Thailand business hours.',
    focusIndustries: ['hospitality', 'restaurant', 'gym', 'healthcare'],
    indexable: false,
  },
  {
    slug: 'australia',
    country: 'Australia',
    inSentence: 'Australia',
    region: 'Asia-Pacific',
    timeZoneNote: 'Working sessions scheduled to overlap Australian business hours.',
    focusIndustries: ['restaurant', 'cleaning-facility-services', 'field-service', 'multi-site'],
    indexable: false,
  },
  {
    slug: 'canada',
    country: 'Canada',
    inSentence: 'Canada',
    region: 'North America',
    timeZoneNote: 'Shared and adjacent time zones with VexaOS in the United States.',
    focusIndustries: ['restaurant', 'retail', 'auto-service', 'multi-site'],
    indexable: false,
  },
];

export const MARKETS_BY_SLUG: Record<string, Market> = Object.fromEntries(MARKETS.map((m) => [m.slug, m]));

/** Countries offered in intake forms. Kept short; "Other" captures the rest. */
export const COUNTRY_OPTIONS = [
  'United States',
  'Canada',
  'United Kingdom',
  'Ireland',
  'Germany',
  'France',
  'Netherlands',
  'Spain',
  'Italy',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Singapore',
  'Thailand',
  'Malaysia',
  'Philippines',
  'Indonesia',
  'Vietnam',
  'Australia',
  'New Zealand',
  'Mexico',
  'Other',
];
