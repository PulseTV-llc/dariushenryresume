'use client';

import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { LOCALES, LOCALE_COOKIE, LOCALE_INFO, localePath, stripLocale, type Locale } from '@/lib/i18n/config';

export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Language switcher. Plain links (crawlable, with hreflang) to the same page
 * in each language; choosing one is remembered in a cookie so automatic
 * detection never overrides it.
 */
export default function LocaleSwitcher({ locale, label, align = 'right', tone = 'dark' }: { locale: Locale; label: string; align?: 'left' | 'right'; tone?: 'dark' | 'light' }) {
  const { path } = stripLocale(usePathname() || '/');
  return (
    <details className="group relative">
      <summary
        aria-label={label}
        className={`flex h-10 cursor-pointer list-none items-center gap-1.5 rounded-xl px-2.5 text-sm font-medium [&::-webkit-details-marker]:hidden ${tone === 'light' ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}`}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">{locale}</span>
      </summary>
      <ul className={`absolute z-50 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-blue-900/10 ${align === 'right' ? 'right-0' : 'left-0'}`}>
        {LOCALES.map((l) => (
          <li key={l}>
            <a
              href={localePath(l, path)}
              hrefLang={LOCALE_INFO[l].tag}
              lang={LOCALE_INFO[l].tag}
              aria-current={l === locale ? 'true' : undefined}
              onClick={() => rememberLocale(l)}
              className={`block rounded-xl px-3 py-2 text-sm ${l === locale ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {LOCALE_INFO[l].name}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
