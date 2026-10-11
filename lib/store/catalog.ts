import { rpc } from './supabase';
import { storeConfigured } from './config';
import type { Catalog, StoreProduct } from './types';

/** Cache tag: the admin dashboard clears it after every change (POST /api/store/revalidate). */
export const STORE_TAG = 'store';
const cache = { next: { revalidate: 300, tags: [STORE_TAG] } };
const EMPTY: Catalog = { products: [], categories: [] };

/** Everything on sale. Never throws: if the store cannot be reached the site simply shows no products. */
export async function getCatalog(): Promise<Catalog> {
  if (!storeConfigured()) return EMPTY;
  try { return (await rpc<Catalog>('store_catalog', {}, cache)) ?? EMPTY; } catch { return EMPTY; }
}
export async function getProduct(slug: string): Promise<StoreProduct | null> {
  if (!storeConfigured() || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return null;
  try { return await rpc<StoreProduct | null>('store_product', { p_slug: slug }, cache); } catch { return null; }
}
/** The "Store" link in the navigation appears only when something is on sale. */
export const hasActiveProducts = async () => (await getCatalog()).products.length > 0;
