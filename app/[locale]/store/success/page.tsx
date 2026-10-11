import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Section } from '@/components/site/ui';
import ClearCart from '@/components/store/ClearCart';
import { isLocale, localePath } from '@/lib/i18n/config';
import { storeStrings } from '@/lib/store/strings';

export function generateMetadata({ params }: { params: { locale: string } }) {
  return isLocale(params.locale) ? { title: storeStrings(params.locale).success.title, robots: { index: false, follow: false } } : {};
}

export default function CheckoutSuccessPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = storeStrings(params.locale);
  return (
    <Section className="!pt-32 sm:!pt-40">
      <ClearCart />
      <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{t.success.title}</h1>
        <p className="mt-3 text-slate-600">{t.success.body}</p>
        <Link href={localePath(params.locale, '/store')} className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
          {t.success.back}
        </Link>
      </div>
    </Section>
  );
}
