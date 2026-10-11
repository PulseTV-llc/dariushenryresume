import { MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { CHANNEL_NAME, regionChannels } from '@/lib/i18n/regions';

/** Regional chat channels. Renders nothing until a channel is configured. */
export default function RegionContacts({ locale, label, className = '' }: { locale: Locale; label: string; className?: string }) {
  const channels = regionChannels(locale);
  if (channels.length === 0) return null;
  return (
    <div className={className}>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {channels.map(({ channel, url }) => (
          <li key={channel}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 hover:border-blue-300">
              <MessageCircle className="h-4 w-4 text-blue-600" aria-hidden="true" />
              {CHANNEL_NAME[channel]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
