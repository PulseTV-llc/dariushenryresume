import { Inter, Noto_Sans_Thai } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import SiteNav, { type NavGroup } from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import LocaleSuggest from '@/components/site/LocaleSuggest';
import { baseMetadata } from '../metadata';
import { LOCALES, LOCALE_INFO, isLocale, localePath } from '@/lib/i18n/config';
import { getContent } from '@/lib/i18n/content';
import { siteSchemas } from '@/lib/structured-data';
import { INDUSTRIES, PRODUCTS, RESTAURANT_OS_HREF, industryHref, productHref } from '@/lib/site';
import { hasActiveProducts } from '@/lib/store/catalog';
import { storeStrings } from '@/lib/store/strings';

// Inter covers Latin and Vietnamese. Thai gets its own face, loaded only when used.
const inter = Inter({ subsets: ['latin', 'latin-ext', 'vietnamese'], display: 'swap', variable: '--font-inter' });
const thai = Noto_Sans_Thai({ subsets: ['thai'], display: 'swap', variable: '--font-thai', preload: false });

// No `dynamicParams = false` here: it would also block the store's product pages (app/[locale]/store/[slug]),
// which come from the database. Unknown locales cannot reach this layout (the middleware rewrites them) and
// are refused below; the fixed [slug] pages set dynamicParams = false themselves.
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export function generateMetadata({ params }: { params: { locale: string } }) {
  return isLocale(params.locale) ? baseMetadata(params.locale) : {};
}

export const viewport = { themeColor: '#f3f6fc', colorScheme: 'light', width: 'device-width', initialScale: 1 };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const c = getContent(locale);
  const { nav, status } = c.common;
  const L = (p: string) => localePath(locale, p);

  const groups: NavGroup[] = [
    { label: nav.platform, href: L('/platform') },
    {
      label: nav.products,
      href: L('/products'),
      items: PRODUCTS.map((p) => ({
        href: L(productHref(p.slug)),
        label: c.catalog.products[p.slug].short,
        description: c.catalog.products[p.slug].summary,
        badge: p.status === 'available' ? undefined : status[p.status],
      })),
    },
    {
      label: nav.solutions,
      href: L('/solutions'),
      items: [
        ...INDUSTRIES.map((i) => ({ href: L(industryHref(i.slug)), label: c.catalog.industries[i.slug].name })),
        { href: L(RESTAURANT_OS_HREF), label: c.catalog.restaurantOs.name, description: nav.hospitality },
      ],
    },
    // the store appears in the navigation only once a product is on sale
    ...((await hasActiveProducts()) ? [{ label: storeStrings(locale).nav, href: L('/store') }] : []),
    { label: nav.about, href: L('/about') },
  ];

  return (
    <html lang={LOCALE_INFO[locale].tag} className={`${inter.variable} ${thai.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
      </head>
      <body>
        {siteSchemas(locale, c.common.description, c.common.tagline).map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <SiteNav
          locale={locale}
          groups={groups}
          homeHref={L('/')}
          ctaHref={L('/contact')}
          t={{ home: nav.home, main: nav.main, skip: nav.skip, openMenu: nav.openMenu, closeMenu: nav.closeMenu, bookDemo: nav.bookDemo, language: c.common.language.switchTo }}
        />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <SiteFooter locale={locale} c={c} />
        <LocaleSuggest locale={locale} dismiss={c.common.language.dismiss} />
        <Analytics />
      </body>
    </html>
  );
}
