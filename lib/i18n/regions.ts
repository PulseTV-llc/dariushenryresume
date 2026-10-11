import type { Locale } from './config';

/**
 * Regional contact channels (LINE, Zalo, WhatsApp).
 *
 * These are PLACEHOLDERS. Nothing is shown on the site until a value is set
 * in the environment, so no channel is advertised before someone answers it.
 * Set, for example, NEXT_PUBLIC_CONTACT_LINE_TH=https://line.me/R/ti/p/@yourid
 */
export type Channel = 'line' | 'zalo' | 'whatsapp';

export const CHANNEL_NAME: Record<Channel, string> = { line: 'LINE', zalo: 'Zalo', whatsapp: 'WhatsApp' };

// Next.js only inlines NEXT_PUBLIC_* when referenced statically, so each one is written out.
const CONFIG: Record<Locale, Partial<Record<Channel, string | undefined>>> = {
  en: { whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_EN },
  th: { line: process.env.NEXT_PUBLIC_CONTACT_LINE_TH, whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_TH },
  vi: { zalo: process.env.NEXT_PUBLIC_CONTACT_ZALO_VI, whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_VI },
  id: { whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_ID, line: process.env.NEXT_PUBLIC_CONTACT_LINE_ID },
  fil: { whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_FIL },
};

/**
 * Africa is served in English today, so its WhatsApp channel is chosen by the
 * visitor's country (set by the middleware in a cookie), not by language.
 * When African languages are added (see docs/LOCALIZATION.md) they can get
 * their own entries in CONFIG above as well.
 */
export const REGION_COOKIE = 'vx_region';
export type Region = 'africa';
const AFRICA = new Set(('DZ AO BJ BW BF BI CV CM CF TD KM CG CD CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL SO ZA SS SD TZ TG TN UG ZM ZW').split(' '));
export const regionOf = (country: string | null | undefined): Region | null => (country && AFRICA.has(country.toUpperCase()) ? 'africa' : null);
const REGION_CONFIG: Record<Region, Partial<Record<Channel, string | undefined>>> = {
  africa: { whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_AFRICA },
};
const valid = (entries: Partial<Record<Channel, string | undefined>>) =>
  (Object.entries(entries) as [Channel, string | undefined][])
    .filter((e): e is [Channel, string] => typeof e[1] === 'string' && e[1].startsWith('https://'))
    .map(([channel, url]) => ({ channel, url }));
/** Channels for a region; a channel the language already offers is not repeated. */
export function regionOnlyChannels(region: Region | null, locale: Locale): { channel: Channel; url: string }[] {
  if (!region) return [];
  const have = new Set(regionChannels(locale).map((c) => c.channel));
  return valid(REGION_CONFIG[region]).filter((c) => !have.has(c.channel));
}

/** Only channels with a valid https link are returned. */
export function regionChannels(locale: Locale): { channel: Channel; url: string }[] {
  return (Object.entries(CONFIG[locale]) as [Channel, string | undefined][])
    .filter((e): e is [Channel, string] => typeof e[1] === 'string' && e[1].startsWith('https://'))
    .map(([channel, url]) => ({ channel, url }));
}
