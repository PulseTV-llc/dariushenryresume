import type { Locale } from '@/lib/i18n/config';
import { money } from '@/lib/store/format';
import type { StoreProduct } from '@/lib/store/types';
import type { LocateNodeStrings } from './strings';

/**
 * What the page says about buying, taken from the product's real state in the store:
 * its status, its price (or "Price TBA") and whether sign-ups are open. Nothing is assumed.
 */
export interface BuyView {
  price: string;
  status: string;
  /** notify: the email form on this page; buy / view: the product page in the store */
  action: 'notify' | 'buy' | 'view';
  label: string;
}
export function buyView(p: Pick<StoreProduct, 'status' | 'from_cents' | 'currency' | 'expected_text' | 'notify_enabled' | 'available' | 'price_varies'>, t: LocateNodeStrings, fromLabel: string, locale: Locale): BuyView {
  const amount = p.from_cents == null ? null : money(p.from_cents, p.currency, locale);
  const price = amount == null ? t.buy.priceTba : p.price_varies ? fromLabel.replace('{price}', amount) : amount;
  if (p.status === 'coming_soon') {
    const status = p.expected_text ? `${t.status.soon} · ${t.status.expected.replace('{when}', p.expected_text)}` : t.status.soon;
    return p.notify_enabled ? { price, status, action: 'notify', label: t.buy.notify } : { price, status, action: 'view', label: t.buy.view };
  }
  return p.available && amount != null ? { price, status: t.status.available, action: 'buy', label: t.buy.buy } : { price, status: t.status.development, action: 'view', label: t.buy.view };
}

/** Split a sentence into words for the "brightens as you scroll" statement (spaces kept with the word before). */
export const words = (text: string) => text.match(/\S+\s*/g) ?? [];
