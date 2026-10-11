import { notFound } from 'next/navigation';
import { Section } from '@/components/site/ui';
import CartView from '@/components/store/CartView';
import { isLocale } from '@/lib/i18n/config';
import { checkoutEnabled } from '@/lib/store/config';
import { storeStrings } from '@/lib/store/strings';

export const dynamic = 'force-dynamic';   // reads whether checkout is configured at request time

export function generateMetadata({ params }: { params: { locale: string } }) {
  return isLocale(params.locale) ? { title: storeStrings(params.locale).cartTitle, robots: { index: false, follow: false } } : {};
}

export default function CartPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = storeStrings(params.locale);
  return (
    <Section className="!pt-28 sm:!pt-32">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">{t.cartTitle}</h1>
      <CartView locale={params.locale} t={t} checkoutOpen={checkoutEnabled()} testMode={/^(sk|rk)_test_/.test(process.env.STRIPE_SECRET_KEY ?? '')} />
    </Section>
  );
}
