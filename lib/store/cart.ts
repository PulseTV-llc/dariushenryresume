import type { CartItem } from './types';

/** Cart rules. Pure: the browser keeps the list, the database decides prices and availability at checkout. */
/** A sanity cap only: the real limit per product (and bulk prices) come from the database. */
export const MAX_QUANTITY = 10000;
export const MAX_LINES = 20;
export const CART_KEY = 'vx_cart_v1';

const same = (a: CartItem, productId: string, variantId: string | null) => a.productId === productId && (a.variantId ?? null) === (variantId ?? null);
const clamp = (q: number, max = MAX_QUANTITY) => Math.max(1, Math.min(Math.floor(Number(q)) || 1, Math.max(1, Math.min(max, MAX_QUANTITY))));

export function addItem(cart: CartItem[], productId: string, variantId: string | null, quantity = 1, max = MAX_QUANTITY): CartItem[] {
  const found = cart.find((i) => same(i, productId, variantId));
  if (found) return cart.map((i) => (i === found ? { ...i, quantity: clamp(i.quantity + quantity, max) } : i));
  if (cart.length >= MAX_LINES) return cart;
  return [...cart, { productId, variantId: variantId ?? null, quantity: clamp(quantity, max) }];
}
export function setQuantity(cart: CartItem[], productId: string, variantId: string | null, quantity: number, max = MAX_QUANTITY): CartItem[] {
  if (quantity <= 0) return removeItem(cart, productId, variantId);
  return cart.map((i) => (same(i, productId, variantId) ? { ...i, quantity: clamp(quantity, max) } : i));
}
export const removeItem = (cart: CartItem[], productId: string, variantId: string | null) => cart.filter((i) => !same(i, productId, variantId));
export const cartCount = (cart: CartItem[]) => cart.reduce((n, i) => n + i.quantity, 0);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Anything read from storage or a request body is checked before use. */
export function parseCart(raw: unknown): CartItem[] {
  let v = raw;
  if (typeof raw === 'string') { try { v = JSON.parse(raw); } catch { return []; } }
  if (!Array.isArray(v)) return [];
  const out: CartItem[] = [];
  for (const x of v.slice(0, MAX_LINES * 2)) {
    const productId = x?.productId ?? x?.product_id, variantId = x?.variantId ?? x?.variant_id ?? null, q = Number(x?.quantity);
    if (typeof productId !== 'string' || !UUID.test(productId)) continue;
    if (variantId !== null && (typeof variantId !== 'string' || !UUID.test(variantId))) continue;
    if (!Number.isFinite(q) || q < 1) continue;
    const merged = addItem(out, productId, variantId, q);
    out.length = 0; out.push(...merged);
  }
  return out.slice(0, MAX_LINES);
}
/** The shape public.store_quote expects. */
export const quoteItems = (cart: CartItem[]) => cart.map((i) => ({ product_id: i.productId, variant_id: i.variantId, quantity: i.quantity }));
