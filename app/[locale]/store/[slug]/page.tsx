import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Section } from '@/components/site/ui';
import CartLink from '@/components/store/CartLink';
import Gallery from '@/components/store/Gallery';
import ProductBuy from '@/components/store/ProductBuy';
import { Availability } from '@/components/store/StoreParts';
import { pageMeta } from '../../../metadata';
import { isLocale, localePath } from '@/lib/i18n/config';
import { getProduct } from '@/lib/store/catalog';
import { checkoutEnabled, imageUrl } from '@/lib/store/config';
import { productText } from '@/lib/store/format';
import { productSchema } from '@/lib/store/jsonld';
import { storeStrings } from '@/lib/store/strings';

type Params = { locale: string; slug: string };

// Products come from the database: pages are built on first visit and refreshed when the admin saves.
export const dynamicParams = true;
export const revalidate = 300;
export const generateStaticParams = () => [];

export async function generateMetadata({ params }: { params: Params }) {
  if (!isLocale(params.locale)) return {};
  const p = await getProduct(params.slug);
  if (!p) return {};
  const text = productText(p, params.locale);
  const localized = params.locale === 'en' || !!p.translations?.[params.locale]?.name;
  const meta = pageMeta(params.locale, `/store/${p.slug}`, {
    title: (params.locale === 'en' && p.seo_title) || text.name,
    description: (params.locale === 'en' && p.seo_description) || text.summary || storeStrings(params.locale).metaDescription,
  });
  return {
    ...meta,
    // a page whose product text is still English points search engines at the English page
    ...(localized ? {} : { alternates: { ...meta.alternates, canonical: (meta.alternates?.languages as Record<string, string>).en } }),
    openGraph: { ...meta.openGraph, ...(p.images[0] ? { images: [{ url: imageUrl(p.images[0].path), alt: p.images[0].alt || text.name }] } : {}) },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const p = await getProduct(params.slug);
  if (!p) notFound();
  const t = storeStrings(locale);
  const text = productText(p, locale);
  return (
    <Section className="!pt-28 sm:!pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(p, locale)) }} />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href={localePath(locale, '/store')} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />{t.allProducts}
        </Link>
        <CartLink href={localePath(locale, '/store/cart')} label={t.cart} />
      </div>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Gallery images={p.images} name={text.name} t={t} />
        <div>
          {p.category && <p className="mono-label mb-2 text-blue-700">{p.category.name}</p>}
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">{text.name}</h1>
          {text.summary && <p className="mt-3 text-lg leading-relaxed text-slate-600">{text.summary}</p>}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Availability product={p} t={t} />
            {p.inventory_mode === 'made_to_order' && p.lead_time_days != null && <span className="text-sm text-slate-600">{t.leadTime.replace('{days}', String(p.lead_time_days))}</span>}
          </div>
          <div className="mt-6">
            <ProductBuy product={p} locale={locale} t={t} checkoutOpen={checkoutEnabled()} contactHref={localePath(locale, '/contact')} cartHref={localePath(locale, '/store/cart')} />
          </div>
          {text.description && (
            <div className="mt-10 border-t border-slate-200 pt-6">
              <h2 className="text-base font-semibold text-slate-900">{t.description}</h2>
              <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-slate-700">
                {text.description.split(/\n{2,}/).map((para, i) => <p key={i} className="whitespace-pre-line">{para}</p>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
