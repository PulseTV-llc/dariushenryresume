'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { CART_KEY, addItem, cartCount, parseCart, removeItem, setQuantity } from '@/lib/store/cart';
import type { CartItem } from '@/lib/store/types';

const EMPTY: CartItem[] = [];
let cached: { raw: string | null; items: CartItem[] } = { raw: null, items: EMPTY };
const listeners = new Set<() => void>();

function read(): CartItem[] {
  let raw: string | null = null;
  try { raw = window.localStorage.getItem(CART_KEY); } catch { /* private mode */ }
  if (raw !== cached.raw) cached = { raw, items: raw ? parseCart(raw) : EMPTY };
  return cached.items;
}
function write(items: CartItem[]) {
  try { window.localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch { /* private mode: the cart lasts for this page only */ }
  cached = { raw: JSON.stringify(items), items };
  listeners.forEach((l) => l());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => { if (e.key === CART_KEY) listener(); };
  window.addEventListener('storage', onStorage);
  return () => { listeners.delete(listener); window.removeEventListener('storage', onStorage); };
}

/** The cart, kept in this browser. Prices are never stored here: the database quotes them. */
export function useCart() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    items,
    count: cartCount(items),
    add: useCallback((productId: string, variantId: string | null, quantity: number, max?: number) => write(addItem(read(), productId, variantId, quantity, max)), []),
    setQuantity: useCallback((productId: string, variantId: string | null, quantity: number) => write(setQuantity(read(), productId, variantId, quantity)), []),
    remove: useCallback((productId: string, variantId: string | null) => write(removeItem(read(), productId, variantId)), []),
    clear: useCallback(() => write([]), []),
  };
}
