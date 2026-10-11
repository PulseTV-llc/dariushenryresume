import { notFound } from 'next/navigation';
import { Eyebrow, Button, Section, rich } from '@/components/site/ui';
import CartLink from '@/components/store/CartLink';
import { ProductCard } from '@/components/store/StoreParts';
import { pageMeta } from '../../metadata';
import { isLocale, localePath } from '@/lib/i18n/config';
import { getContent } from '@/lib/i18n/content';
import { getCatalog } from '@/lib/store/catalog';
import { storeListSchema } from '@/lib/store/jsonld';
import { storeStrings } from '@/lib/store/strings';

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
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <div className="page-wash pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-5 flex justify-center"><Eyebrow>{t.eyebrow}</Eyebrow></div>
          <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">{rich(t.heading)}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-slate-600">{t.subtitle}</p>
        </div>
      </section>
      <Section className="!pt-4">
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
