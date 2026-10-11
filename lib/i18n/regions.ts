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

/** Only channels with a valid https link are returned. */
export function regionChannels(locale: Locale): { channel: Channel; url: string }[] {
  return (Object.entries(CONFIG[locale]) as [Channel, string | undefined][])
    .filter((e): e is [Channel, string] => typeof e[1] === 'string' && e[1].startsWith('https://'))
    .map(([channel, url]) => ({ channel, url }));
}
