import { notFound } from 'next/navigation';
import PageView from '@/components/site/PageView';
import { pageMeta } from '../../metadata';
import { isLocale } from '@/lib/i18n/config';
import { getContent } from '@/lib/i18n/content';
import { locateNodeLink } from '@/lib/locate-node/nav';

// the Locate Node card follows the store (status, or hidden), like the page it links to
export const revalidate = 300;

export function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return {};
  return pageMeta(params.locale, '/products', getContent(params.locale).pages.products.meta);
}

export default async function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const c = getContent(params.locale);
  return <PageView locale={params.locale} c={c} page={c.pages.products} placement="products" locateNode={await locateNodeLink(params.locale)} />;
}
