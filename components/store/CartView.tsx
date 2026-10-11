'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Lock, Minus, Plus, Trash2 } from 'lucide-react';
import { localePath, type Locale } from '@/lib/i18n/config';
import { quoteItems } from '@/lib/store/cart';
import { imageUrl } from '@/lib/store/config';
import { money } from '@/lib/store/format';
import { StoreError, rpc } from '@/lib/store/supabase';
import type { StoreStrings } from '@/lib/store/strings';
import type { Quote } from '@/lib/store/types';
import { useCart } from './useCart';

/** The cart: lines and prices as the database quotes them right now, then on to Stripe Checkout. */
export default function CartView({ locale, t, checkoutOpen, testMode }: { locale: Locale; t: StoreStrings; checkoutOpen: boolean; testMode: boolean }) {
  const cart = useCart();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const key = JSON.stringify(cart.items);

  useEffect(() => {
    let live = true;
    if (cart.items.length === 0) { setQuote(null); setProblem(null); setLoading(false); return; }
    setLoading(true);
    rpc<Quote>('store_quote', { p_items: quoteItems(cart.items) })
      .then((q) => { if (live) { setQuote(q); setProblem(null); } })
      .catch((e) => { if (live) { setQuote(null); setProblem(e instanceof StoreError && e.readable ? e.message : t.checkoutFailed); } })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  async function checkout() {
    setPaying(true);
    setProblem(null);
    try {
      const res = await fetch('/api/store/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ items: cart.items, locale }) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && typeof body.url === 'string') { window.location.assign(body.url); return; }
      setProblem(body.error === 'cart_changed' && body.message ? `${t.cartChanged} ${body.message}` : t.checkoutFailed);
    } catch { setProblem(t.checkoutFailed); }
    setPaying(false);
  }

  const storeHref = localePath(locale, '/store');
  if (cart.items.length === 0) {
    return (
      <div className="glass rounded-3xl p-8 text-center">
        <p className="text-slate-700">{t.cartEmpty}</p>
        <Link href={storeHref} className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900">{t.continueShopping}</Link>
      </div>
    );
  }
  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="glass rounded-3xl p-4 sm:p-6">
        {problem && (
          <div role="alert" className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950 ring-1 ring-amber-200">
            {problem}
            {!quote && <button type="button" onClick={cart.clear} className="ml-2 font-semibold underline">{t.remove}</button>}
          </div>
        )}
        {loading && !quote ? <p className="flex items-center gap-2 py-8 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /></p> : null}
        <ul className="divide-y divide-slate-200">
          {(quote?.lines ?? []).map((l) => (
            <li key={`${l.product_id}:${l.variant_id ?? ''}`} className="flex gap-4 py-4">
              {l.image
                ? <Image src={imageUrl(l.image)} alt="" width={96} height={96} className="h-20 w-20 shrink-0 rounded-xl bg-white object-cover" />
                : <div className="h-20 w-20 shrink-0 rounded-xl bg-slate-100" aria-hidden="true" />}
              <div className="min-w-0 flex-1">
                <Link href={localePath(locale, `/store/${l.slug}`)} className="block truncate font-semibold text-slate-900 hover:text-blue-700">{l.name}</Link>
                <p className="text-sm text-slate-500">{[l.variant_title, l.made_to_order ? t.madeToOrder : null].filter(Boolean).join(' · ')}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <div className="inline-flex h-10 items-center rounded-xl border border-slate-300 bg-white">
                    <button type="button" onClick={() => cart.setQuantity(l.product_id, l.variant_id, l.quantity - 1)} aria-label={`${t.quantity} −`} className="inline-flex h-10 w-10 items-center justify-center text-slate-700"><Minus className="h-4 w-4" aria-hidden="true" /></button>
                    <span className="w-7 text-center text-sm font-semibold tabular-nums">{l.quantity}</span>
                    <button type="button" onClick={() => cart.setQuantity(l.product_id, l.variant_id, l.quantity + 1)} disabled={l.quantity >= 10} aria-label={`${t.quantity} +`} className="inline-flex h-10 w-10 items-center justify-center text-slate-700 disabled:opacity-40"><Plus className="h-4 w-4" aria-hidden="true" /></button>
                  </div>
                  <button type="button" onClick={() => cart.remove(l.product_id, l.variant_id)} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600"><Trash2 className="h-4 w-4" aria-hidden="true" />{t.remove}</button>
                </div>
              </div>
              <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">{money(l.unit_cents * l.quantity, quote!.currency, locale)}</p>
            </li>
          ))}
        </ul>
        <Link href={storeHref} className="mt-2 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900">{t.continueShopping}</Link>
      </div>

      <aside className="glass h-fit rounded-3xl p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-slate-600">{t.subtotal}</span>
          <span className="text-xl font-bold tabular-nums text-slate-900">{quote ? money(quote.subtotal_cents, quote.currency, locale) : '—'}</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">{t.shippingNote}</p>
        {checkoutOpen ? (
          <>
            <button type="button" onClick={checkout} disabled={!quote || paying || loading}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-50">
              {paying ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{t.redirecting}</> : <><Lock className="h-4 w-4" aria-hidden="true" />{t.checkout}</>}
            </button>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">{t.securePayment}</p>
            {testMode && <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900 ring-1 ring-amber-200">{t.testMode}</p>}
          </>
        ) : (
          <>
            <Link href={localePath(locale, '/contact')} className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">{t.contactToOrder}</Link>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">{t.contactNote}</p>
          </>
        )}
      </aside>
    </div>
  );
}
