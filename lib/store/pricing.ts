import type { PriceTier, StoreProduct, StoreVariant } from './types';

/**
 * Bulk prices as the storefront shows them. The same rule as the database
 * (store.unit_price), which is the one that charges: this file only DISPLAYS.
 *  - a variant with its own ranges uses those;
 *  - a variant with its own price and no ranges keeps that price;
 *  - everything else uses the product's ranges.
 * Quantity 1 .. (first range - 1) is the base price.
 */
type P = Pick<StoreProduct, 'price_cents' | 'price_tiers'>;
type V = Pick<StoreVariant, 'id' | 'price_cents' | 'own_price'> | null | undefined;

export interface TierRow { min: number; max: number | null; unit_cents: number; savePct: number; base: boolean }

export const basePrice = (p: P, v?: V): number | null => (v ? v.price_cents : p.price_cents);

export function tiersFor(p: P, v?: V): PriceTier[] {
  const all = p.price_tiers ?? [];
  const own = v ? all.filter((t) => t.variant_id === v.id) : [];
  const list = own.length ? own : v?.own_price ? [] : all.filter((t) => t.variant_id === null);
  return [...list].sort((a, b) => a.min_qty - b.min_qty);
}

export function unitPrice(p: P, v: V, quantity: number): { unit_cents: number | null; base_cents: number | null; tier: PriceTier | null } {
  const base = basePrice(p, v);
  const tier = tiersFor(p, v).find((t) => quantity >= t.min_qty && (t.max_qty == null || quantity <= t.max_qty)) ?? null;
  return { unit_cents: base == null ? null : tier ? tier.unit_cents : base, base_cents: base, tier };
}

/** The whole price list, starting with the base price for the first quantities. Empty when there are no bulk prices. */
export function tierRows(p: P, v?: V): TierRow[] {
  const base = basePrice(p, v), tiers = tiersFor(p, v);
  if (base == null || tiers.length === 0) return [];
  const pct = (cents: number) => (base > 0 ? Math.round(((base - cents) / base) * 100) : 0);
  return [
    { min: 1, max: tiers[0].min_qty - 1, unit_cents: base, savePct: 0, base: true },
    ...tiers.map((t) => ({ min: t.min_qty, max: t.max_qty, unit_cents: t.unit_cents, savePct: pct(t.unit_cents), base: false })),
  ];
}

/** "1", "2–10", "31+" */
export const rangeLabel = (min: number, max: number | null) => (max == null ? `${min}+` : max === min ? String(min) : `${min}–${max}`);

/** What the buyer saves on a line against paying the base price for every unit (never negative). */
export const lineSavings = (base: number | null | undefined, unit: number, quantity: number) => (base == null ? 0 : Math.max(0, (base - unit) * quantity));

/** The row a quantity falls in. */
export const activeRow = (rows: TierRow[], quantity: number) => rows.findIndex((r) => quantity >= r.min && (r.max == null || quantity <= r.max));
