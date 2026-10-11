'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localePath, stripLocale, type Locale } from '@/lib/i18n/config';
import { common as en } from '@/content/en/common';
import { common as th } from '@/content/th/common';
import { common as vi } from '@/content/vi/common';
import { common as id } from '@/content/id/common';
import { common as fil } from '@/content/fil/common';

// not-found receives no route params, so the language is read from the address.
const TEXT: Record<Locale, { title?: string; body?: string; back?: string } | undefined> = { en: en.notFound, th: th.notFound, vi: vi.notFound, id: id.notFound, fil: fil.notFound };

/** "Not found" inside the site frame (navigation and footer stay), in the visitor's language. */
export default function LocaleNotFound() {
  const { locale } = stripLocale(usePathname() || '/');
  const t = { ...en.notFound, ...Object.fromEntries(Object.entries(TEXT[locale] ?? {}).filter(([, v]) => typeof v === 'string' && v.trim())) };
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-24 text-center">
      <div>
        <p className="mono-label text-blue-700">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{t.title}</h1>
        <p className="mt-3 text-slate-600">{t.body}</p>
        <Link href={localePath(locale, '/')} className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">{t.back}</Link>
      </div>
    </div>
  );
}
