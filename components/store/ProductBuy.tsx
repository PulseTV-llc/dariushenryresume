'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Minus, Plus } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { money } from '@/lib/store/format';
import type { StoreStrings } from '@/lib/store/strings';
import type { StoreProduct } from '@/lib/store/types';
import { useCart } from './useCart';

const primary = 'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-800 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto';

/** Price, option, quantity and the button: "Add to cart" when checkout is open, otherwise "Contact to order". */
export default function ProductBuy({ product, locale, t, checkoutOpen, contactHref, cartHref }: {
  product: StoreProduct; locale: Locale; t: StoreStrings; checkoutOpen: boolean; contactHref: string; cartHref: string;
}) {
  const cart = useCart();
  const hasVariants = product.variants.length > 0;
  const [variantId, setVariantId] = useState<string>(product.variants.length === 1 ? product.variants[0].id : '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = useMemo(() => product.variants.find((v) => v.id === variantId) ?? null, [product.variants, variantId]);

  const cents = hasVariants ? variant?.price_cents ?? product.from_cents : product.price_cents;
  const available = hasVariants ? (variant ? variant.available : product.available) : product.available;
  const max = Math.max(1, hasVariants ? variant?.max_quantity ?? 10 : product.max_quantity);
  const price = cents == null ? null : !variant && product.price_varies ? t.from.replace('{price}', money(cents, product.currency, locale)) : money(cents, product.currency, locale);
  const canBuy = checkoutOpen && cents != null && available;
  const needsChoice = hasVariants && !variant;

  const add = () => {
    cart.add(product.id, variant?.id ?? null, Math.min(quantity, max), max);
    setAdded(true);
  };

  return (
    <div>
      <p className="text-2xl font-bold text-slate-900">{price ?? t.noPrice}</p>
      {product.compare_at_cents != null && cents != null && product.compare_at_cents > cents && (
        <p className="text-sm text-slate-500 line-through">{money(product.compare_at_cents, product.currency, locale)}</p>
      )}

      {hasVariants && (
        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-medium text-slate-800">{product.options.map((o) => o.name).join(' / ') || t.option}</span>
          <select value={variantId} onChange={(e) => { setVariantId(e.target.value); setQuantity(1); setAdded(false); }}
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30 sm:max-w-xs">
            <option value="">{t.chooseOption}</option>
            {product.variants.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.available}>
                {v.title}{v.price_cents != null && product.price_varies ? ` · ${money(v.price_cents, product.currency, locale)}` : ''}{!v.available ? ` · ${t.outOfStock}` : ''}
              </option>
            ))}
          </select>
        </label>
      )}

      {canBuy ? (
        <>
          <div className="mt-5 flex flex-wrap items-end gap-3">
            <div>
              <span className="mb-2 block text-sm font-medium text-slate-800">{t.quantity}</span>
              <div className="inline-flex h-12 items-center rounded-xl border border-slate-300 bg-white">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1} aria-label={`${t.quantity} −`} className="inline-flex h-12 w-11 items-center justify-center text-slate-700 disabled:opacity-40"><Minus className="h-4 w-4" aria-hidden="true" /></button>
                <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">{Math.min(quantity, max)}</span>
                <button type="button" onClick={() => setQuantity((q) => Math.min(max, q + 1))} disabled={quantity >= max} aria-label={`${t.quantity} +`} className="inline-flex h-12 w-11 items-center justify-center text-slate-700 disabled:opacity-40"><Plus className="h-4 w-4" aria-hidden="true" /></button>
              </div>
            </div>
            <button type="button" onClick={add} disabled={needsChoice} className={primary}>{t.addToCart}</button>
          </div>
          {added && (
            <p role="status" className="mt-3 flex flex-wrap items-center gap-2 text-sm text-emerald-700">
              <Check className="h-4 w-4" aria-hidden="true" />{t.added}
              <Link href={cartHref} className="font-semibold text-blue-700 hover:text-blue-900">{t.viewCart}</Link>
            </p>
          )}
        </>
      ) : (
        <div className="mt-5">
          <Link href={contactHref} className={primary}>{t.contactToOrder}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          {!checkoutOpen && <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">{t.contactNote}</p>}
        </div>
      )}
    </div>
  );
}
