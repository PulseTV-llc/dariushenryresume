import { notFound } from 'next/navigation';
import PageView from '@/components/site/PageView';
import { pageMeta } from '../metadata';
import { isLocale } from '@/lib/i18n/config';
import { getContent } from '@/lib/i18n/content';

export function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return {};
  return pageMeta(params.locale, '/', getContent(params.locale).pages.home.meta, true);
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const c = getContent(params.locale);
  return <PageView locale={params.locale} c={c} page={c.pages.home} placement="home" home />;
}
