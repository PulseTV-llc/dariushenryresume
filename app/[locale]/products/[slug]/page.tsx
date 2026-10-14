import { notFound } from 'next/navigation';
import PageView from '@/components/site/PageView';
import { pageMeta } from '../../../metadata';
import { isLocale } from '@/lib/i18n/config';
import { getContent } from '@/lib/i18n/content';
import { PRODUCTS, productHref, type ProductSlug } from '@/lib/site';

type Params = { locale: string; slug: string };
const isProduct = (s: string): s is ProductSlug => PRODUCTS.some((p) => p.slug === s);

export const dynamicParams = false;
// the Mobile Gateway has its own page (app/[locale]/products/mobile-gateway), so it is not generated here
export const generateStaticParams = () => PRODUCTS.filter((p) => p.slug !== 'mobile-gateway').map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: { params: Params }) {
  if (!isLocale(params.locale) || !isProduct(params.slug)) return {};
  return pageMeta(params.locale, productHref(params.slug), getContent(params.locale).products[params.slug].meta);
}

export default function ProductPage({ params }: { params: Params }) {
  if (!isLocale(params.locale) || !isProduct(params.slug)) notFound();
  const c = getContent(params.locale);
  return <PageView locale={params.locale} c={c} page={c.products[params.slug]} placement={params.slug} />;
}
