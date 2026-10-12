import { notFound } from 'next/navigation';
import { Button, Section } from '@/components/site/ui';
import StoreHero from '@/components/store/StoreHero';
import CartLink from '@/components/store/CartLink';
import { ProductCard } from '@/components/store/StoreParts';
import { pageMeta } from '../../metadata';
import { isLocale, localePath } from '@/lib/i18n/config';
import { getContent } from '@/lib/i18n/content';
import { getCatalog } from '@/lib/store/catalog';
import { checkoutEnabled, shipCountries, shipsFrom } from '@/lib/store/config';
import { heroChips } from '@/lib/store/hero';
import { storeListSchema } from '@/lib/store/jsonld';
import { storeStrings } from '@/lib/store/strings';
import { LOCATE_NODE_PATH, LOCATE_NODE_SLUG, locateNodeStrings } from '@/lib/locate-node/strings';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return {};
  const t = storeStrings(params.locale);
  const meta = pageMeta(params.locale, '/store', { title: t.title, description: t.metaDescription });
  // an empty store is not something to index
  return (await getCatalog()).products.length ? meta : { ...meta, robots: { index: false, follow: true } };
}

export default async function StorePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = storeStrings(locale);
  const c = getContent(locale);
  const { products, categories } = await getCatalog();
  const locateNode = products.find((p) => p.slug === LOCATE_NODE_SLUG) ?? null;
  return (
    <>
      <StoreHero locale={locale} t={t} chips={heroChips({ products, checkoutOpen: checkoutEnabled(), shipFrom: shipsFrom(), shipTo: shipCountries(), locale, t })} hasProducts={products.length > 0} />
      {locateNode && (
        <div className="px-3 pt-4 sm:px-6 lg:px-8">
          <Link href={localePath(locale, LOCATE_NODE_PATH)} className="group relative mx-auto flex max-w-[88rem] items-center gap-4 overflow-hidden rounded-[1.75rem] bg-[#04060b] px-5 py-4 text-white sm:gap-6 sm:px-8 sm:py-5">
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">{locateNodeStrings(locale).name}</span>
              <span className="mt-1 block text-balance text-lg font-semibold leading-snug sm:text-2xl">{locateNodeStrings(locale).hero.title.join(' ')}</span>
            </span>
            <span className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-sky-200 sm:inline-flex">{locateNodeStrings(locale).store.explore}</span>
            <ArrowRight className="h-5 w-5 shrink-0 text-sky-300 transition group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
          </Link>
        </div>
      )}
      <Section id="products" className="scroll-mt-20 !pt-10 sm:!pt-14">
        {products.length === 0 ? (
          <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-900">{t.empty.title}</h2>
            <p className="mt-2 text-slate-600">{t.empty.body}</p>
            <div className="mt-6"><Button href={localePath(locale, '/contact')}>{c.common.nav.contact}</Button></div>
          </div>
        ) : (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeListSchema(products, locale)) }} />
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600">{categories.length > 1 ? categories.map((x) => x.name).join(' · ') : t.allProducts}</p>
              <CartLink href={localePath(locale, '/store/cart')} label={t.cart} />
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => <li key={p.id}><ProductCard product={p} locale={locale} t={t} /></li>)}
            </ul>
          </>
        )}
      </Section>
    </>
  );
}
