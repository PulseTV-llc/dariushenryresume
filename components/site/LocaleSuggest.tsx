'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { LOCALE_INFO, SUGGEST_COOKIE, isLocale, localePath, stripLocale, type Locale } from '@/lib/i18n/config';
import { rememberLocale } from './LocaleSwitcher';

/**
 * A gentle suggestion, never a redirect: shown when the visitor's country
 * suggests another language than the one their browser asked for. The
 * middleware sets the cookie; this reads it. Bots never get the cookie.
 */
export default function LocaleSuggest({ locale, dismiss }: { locale: Locale; dismiss: string }) {
  const [suggested, setSuggested] = useState<Locale | null>(null);
  const { path } = stripLocale(usePathname() || '/');

  useEffect(() => {
    const m = document.cookie.match(new RegExp(`(?:^|; )${SUGGEST_COOKIE}=([^;]+)`));
    const v = m?.[1];
    if (isLocale(v) && v !== locale) setSuggested(v);
  }, [locale]);

  if (!suggested) return null;

  const close = (choice: Locale) => {
    rememberLocale(choice);
    document.cookie = `${SUGGEST_COOKIE}=; path=/; max-age=0`;
    setSuggested(null);
  };

  return (
    <div role="region" aria-label={LOCALE_INFO[suggested].english} className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 pl-4 shadow-xl shadow-blue-900/15">
      <a href={localePath(suggested, path)} lang={LOCALE_INFO[suggested].tag} onClick={() => close(suggested)} className="flex-1 text-sm font-semibold text-blue-700 hover:text-blue-900">
        {LOCALE_INFO[suggested].suggest}
      </a>
      <button type="button" onClick={() => close(locale)} aria-label={dismiss} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
