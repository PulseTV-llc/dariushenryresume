import { notFound } from 'next/navigation';
import PageView from '@/components/site/PageView';
import { pageMeta } from '../../../metadata';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getContent } from '@/lib/i18n/content';
import { industryPage } from '@/lib/i18n/pages';
import { INDUSTRIES, type IndustrySlug } from '@/lib/site';

type Params = { locale: string; slug: string };
const RESTAURANT = 'restaurant-os';
const isIndustry = (s: string): s is IndustrySlug => INDUSTRIES.some((i) => i.slug === s);

export const dynamicParams = false;
export const generateStaticParams = () => [...INDUSTRIES.map((i) => ({ slug: i.slug })), { slug: RESTAURANT }];

function resolve(locale: Locale, slug: string) {
  const c = getContent(locale);
  if (slug === RESTAURANT) return { c, page: c.pages.restaurantOs };
  if (isIndustry(slug)) return { c, page: industryPage(c, slug) };
  return null;
}

export function generateMetadata({ params }: { params: Params }) {
  const r = isLocale(params.locale) ? resolve(params.locale, params.slug) : null;
  return r && isLocale(params.locale) ? pageMeta(params.locale, `/solutions/${params.slug}`, r.page.meta) : {};
}

export default function SolutionPage({ params }: { params: Params }) {
  if (!isLocale(params.locale)) notFound();
  const r = resolve(params.locale, params.slug);
  if (!r) notFound();
  return <PageView locale={params.locale} c={r.c} page={r.page} placement={`solution_${params.slug}`} />;
}
