import Link from 'next/link';
import { notFound } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { Section } from '@/components/site/ui';

import { isLocale, localePath } from '@/lib/i18n/config';
import { storeStrings } from '@/lib/store/strings';

export function generateMetadata({ params }: { params: { locale: string } }) {
  return isLocale(params.locale) ? { title: storeStrings(params.locale).cancel.title, robots: { index: false, follow: false } } : {};
}

export default function CheckoutCancelPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = storeStrings(params.locale);
  return (
    <Section className="!pt-32 sm:!pt-40">
      
      <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
        <XCircle className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{t.cancel.title}</h1>
        <p className="mt-3 text-slate-600">{t.cancel.body}</p>
        <Link href={localePath(params.locale, '/store/cart')} className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
          {t.cancel.back}
        </Link>
      </div>
    </Section>
  );
}
