'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Minus, Plus } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { money } from '@/lib/store/format';
import { activeRow, lineSavings, rangeLabel, tierRows, unitPrice } from '@/lib/store/pricing';
import type { StoreStrings } from '@/lib/store/strings';
import type { StoreProduct } from '@/lib/store/types';
import { useCart } from './useCart';
import NotifyForm from './NotifyForm';

const primary = 'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-800 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto';

/**
 * Price, option, quantity and the button: "Add to cart" when checkout is open, otherwise "Contact to order".
 * With bulk prices the price follows the quantity and a "Buy more, save" table shows every range. What is
 * shown here is for information: the checkout asks the database for the price again.
 */
export default function ProductBuy({ product, locale, t, checkoutOpen, contactHref, cartHref }: {
  product: StoreProduct; locale: Locale; t: StoreStrings; checkoutOpen: boolean; contactHref: string; cartHref: string;
}) {
  const cart = useCart();
  const hasVariants = product.variants.length > 0;
  const [variantId, setVariantId] = useState<string>(product.variants.length === 1 ? product.variants[0].id : '');
  const [quantity, setQuantity] = useState(1);
  const [typed, setTyped] = useState('1');
  const [added, setAdded] = useState(false);
  const variant = useMemo(() => product.variants.find((v) => v.id === variantId) ?? null, [product.variants, variantId]);
  const m = (cents: number) => money(cents, product.currency, locale);

  const available = hasVariants ? (variant ? variant.available : product.available) : product.available;
  const max = Math.max(1, hasVariants ? variant?.max_quantity ?? product.order_limit ?? 10 : product.max_quantity);
  const qty = Math.min(quantity, max);
  const needsChoice = hasVariants && !variant;
  // before an option is chosen the product's own bulk prices are shown; a chosen variant shows the list that applies to it
  const rows = tierRows(product, needsChoice ? null : variant);
  const price = needsChoice ? { unit_cents: product.from_cents, base_cents: product.from_cents } : unitPrice(product, variant, qty);
  const cents = price.unit_cents;
  const saved = cents == null ? 0 : lineSavings(price.base_cents, cents, qty);
  const row = activeRow(rows, qty);
  const soon = product.status === 'coming_soon';   // shown, never sold: no cart, whatever else is set
  const canBuy = !soon && checkoutOpen && cents != null && available;
  const atLimit = (product.order_limit ?? 10) <= max && qty >= max;   // the limit is the store's, not the stock's

  const setQty = (n: number) => { const v = Math.max(1, Math.min(max, Math.floor(n) || 1)); setQuantity(v); setTyped(String(v)); setAdded(false); };
  const add = () => { cart.add(product.id, variant?.id ?? null, qty, max); setAdded(true); };

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1" aria-live="polite">
        <p className="text-2xl font-bold text-slate-900">
          {cents == null ? (soon ? t.soon.priceTba : t.noPrice) : needsChoice && product.price_varies ? t.from.replace('{price}', m(cents)) : rows.length ? t.bulk.each.replace('{price}', m(cents)) : m(cents)}
        </p>
        {cents != null && price.base_cents != null && cents < price.base_cents && <p className="text-sm text-slate-500 line-through">{m(price.base_cents)}</p>}
        {cents != null && qty > 1 && <p className="text-sm text-slate-600">{qty} × {m(cents)} = <span className="font-semibold text-slate-900">{m(cents * qty)}</span></p>}
      </div>
      {saved > 0 && <p className="mt-1 text-sm font-semibold text-emerald-700" aria-live="polite">{t.bulk.youSave.replace('{amount}', m(saved))}</p>}
      {product.compare_at_cents != null && cents != null && saved === 0 && product.compare_at_cents > cents && (
        <p className="text-sm text-slate-500 line-through">{m(product.compare_at_cents)}</p>
      )}

      {hasVariants && (
        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-medium text-slate-800">{product.options.map((o) => o.name).join(' / ') || t.option}</span>
          <select value={variantId} onChange={(e) => { setVariantId(e.target.value); setQty(1); }}
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30 sm:max-w-xs">
            <option value="">{t.chooseOption}</option>
            {product.variants.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.available}>
                {v.title}{v.price_cents != null && product.price_varies ? ` · ${m(v.price_cents)}` : ''}{!v.available ? ` · ${t.outOfStock}` : ''}
              </option>
            ))}
          </select>
        </label>
      )}

      {rows.length > 0 && (
        <div className="mt-5 max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white/80">
          <table className="w-full text-sm">
            <caption className="border-b border-slate-200 bg-blue-50/60 px-4 py-2 text-left text-sm font-semibold text-slate-900">{t.bulk.title}</caption>
            <thead className="sr-only"><tr><th scope="col">{t.bulk.quantity}</th><th scope="col">{t.bulk.priceEach}</th><th scope="col">{t.bulk.savePct.replace('{pct}', '')}</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.min} aria-current={i === row ? 'true' : undefined} className={i === row ? 'bg-blue-600/[0.07] font-semibold text-slate-900' : 'text-slate-700'}>
                  <td className="px-4 py-2">
                    {canBuy && r.min <= max ? (
                      <button type="button" onClick={() => setQty(r.min)} className="rounded underline-offset-2 hover:underline">{rangeLabel(r.min, r.max)}</button>
                    ) : rangeLabel(r.min, r.max)}
                  </td>
                  <td className="px-4 py-2 tabular-nums">{t.bulk.each.replace('{price}', m(r.unit_cents))}</td>
                  <td className="px-4 py-2 text-right text-emerald-700">{r.savePct > 0 ? t.bulk.savePct.replace('{pct}', String(r.savePct)) : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {canBuy ? (
        <>
          <div className="mt-5 flex flex-wrap items-end gap-3">
            <div>
              <label htmlFor="store-qty" className="mb-2 block text-sm font-medium text-slate-800">{t.quantity}</label>
              <div className="inline-flex h-12 items-center rounded-xl border border-slate-300 bg-white">
                <button type="button" onClick={() => setQty(qty - 1)} disabled={qty <= 1} aria-label={`${t.quantity} −`} className="inline-flex h-12 w-11 items-center justify-center text-slate-700 disabled:opacity-40"><Minus className="h-4 w-4" aria-hidden="true" /></button>
                <input id="store-qty" inputMode="numeric" pattern="[0-9]*" value={typed} min={1} max={max}
                       onChange={(e) => { const v = e.target.value.replace(/\D/g, '').slice(0, 5); setTyped(v); if (v) { setQuantity(Math.max(1, Math.min(max, Number(v)))); setAdded(false); } }}
                       onBlur={() => setQty(qty)}
                       className="h-10 w-14 rounded-md border-0 bg-transparent text-center text-sm font-semibold tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/40" />
                <button type="button" onClick={() => setQty(qty + 1)} disabled={qty >= max} aria-label={`${t.quantity} +`} className="inline-flex h-12 w-11 items-center justify-center text-slate-700 disabled:opacity-40"><Plus className="h-4 w-4" aria-hidden="true" /></button>
              </div>
            </div>
            <button type="button" onClick={add} disabled={needsChoice} className={primary}>{t.addToCart}</button>
          </div>
          {product.bulk_contact && atLimit && (
            <p className="mt-3 text-sm text-slate-600">
              <Link href={contactHref} className="font-semibold text-blue-700 hover:text-blue-900">{t.bulk.contactMore.replace('{n}', String(max))}</Link>
            </p>
          )}
          {added && (
            <p role="status" className="mt-3 flex flex-wrap items-center gap-2 text-sm text-emerald-700">
              <Check className="h-4 w-4" aria-hidden="true" />{t.added}
              <Link href={cartHref} className="font-semibold text-blue-700 hover:text-blue-900">{t.viewCart}</Link>
            </p>
          )}
        </>
      ) : soon ? (
        <div className="mt-5">
          {product.expected_text && <p className="mb-3 text-sm font-medium text-slate-700">{t.soon.expected.replace('{when}', product.expected_text)}</p>}
          <button type="button" disabled aria-disabled="true" className={primary}>{t.soon.badge}</button>
          {product.notify_enabled && <NotifyForm productId={product.id} locale={locale} t={t} />}
        </div>
      ) : (
        <div className="mt-5">
          <Link href={contactHref} className={primary}>{t.contactToOrder}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          {!checkoutOpen && <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">{t.contactNote}</p>}
        </div>
      )}
    </div>
  );
}
