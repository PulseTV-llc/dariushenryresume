import Link from 'next/link';
import { LOCALES, LOCALE_INFO, localePath, type Locale } from '@/lib/i18n/config';
import type { Content } from '@/lib/i18n/content';
import { formatYear } from '@/lib/i18n/format';
import { INDUSTRIES, PRODUCTS, RESTAURANT_OS_HREF, industryHref, productHref } from '@/lib/site';
import type { LocateNodeLink } from '@/lib/locate-node/nav';
import VexaLogo from './VexaLogo';
import RegionContacts from './RegionContacts';
import { ContactLines } from './PageView';

export default function SiteFooter({ locale, c, locateNode = null }: { locale: Locale; c: Content; locateNode?: LocateNodeLink | null }) {
  const { nav, footer, language } = c.common;
  const L = (p: string) => localePath(locale, p);
  const columns: { title: string; links: { href: string; label: string; badge?: string; localized?: boolean }[] }[] = [
    {
      title: nav.platform,
      links: [{ href: '/platform', label: nav.howItWorks }, ...PRODUCTS.map((p) => ({ href: productHref(p.slug), label: c.catalog.products[p.slug].short })),
        ...(locateNode ? [{ href: locateNode.href, label: locateNode.label, badge: locateNode.badge, localized: true }] : [])],
    },
    {
      title: nav.solutions,
      links: [
        ...INDUSTRIES.map((i) => ({ href: industryHref(i.slug), label: c.catalog.industries[i.slug].short })),
        { href: RESTAURANT_OS_HREF, label: c.catalog.restaurantOs.name },
      ],
    },
    {
      title: nav.company,
      links: [
        { href: '/about', label: nav.about },
        { href: '/contact', label: nav.bookDemo },
      ],
    },
  ];
  const draft = LOCALE_INFO[locale].reviewStatus === 'machine-draft';

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <VexaLogo size={30} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              {c.common.tagline} {footer.blurb}
            </p>
            <ContactLines locale={locale} className="mt-6 space-y-3" />
            <RegionContacts locale={locale} label={footer.messageUs} className="mt-5" />
          </div>

          <nav aria-label={nav.footer} className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{col.title}</h2>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.localized ? l.href : L(l.href)} className="inline-flex flex-wrap items-center gap-2 text-sm text-slate-600 hover:text-blue-700">
                        {l.label}
                        {l.badge && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 ring-1 ring-amber-200">{l.badge}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {draft && (
          <p className="mt-10 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-950 ring-1 ring-amber-200">
            {language.draftNotice}{' '}
            <a href="/" hrefLang="en" lang="en" className="font-semibold underline">{language.readEnglish}</a>
          </p>
        )}

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">© {formatYear(locale)} VexaOs. {footer.rights}</p>
          <ul aria-label={language.label} className="flex flex-wrap gap-x-4 gap-y-1">
            {LOCALES.map((l) => (
              <li key={l}>
                <a href={localePath(l, '/')} hrefLang={LOCALE_INFO[l].tag} lang={LOCALE_INFO[l].tag} aria-current={l === locale ? 'true' : undefined}
                  className={`text-sm ${l === locale ? 'font-semibold text-slate-900' : 'text-slate-500 hover:text-blue-700'}`}>
                  {LOCALE_INFO[l].name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
