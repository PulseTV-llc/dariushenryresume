'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { IMAGE_BUCKET, SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

let client: SupabaseClient | null = null;
/** The browser's Supabase client for the admin: its own storage key, so it never mixes with another app's session. */
export function adminClient(): SupabaseClient {
  if (!client) client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { storageKey: 'vx-store-admin', persistSession: true, autoRefreshToken: true } });
  return client;
}

/** Call a public.store_admin_* function as the signed-in member; database messages come back as Error.message. */
export async function call<T>(fn: string, args: Record<string, unknown> = {}): Promise<T> {
  const { data, error } = await adminClient().rpc(fn, args);
  if (error) throw new Error(error.code === '42501' ? 'You are not allowed to do that.' : error.message || 'Something went wrong.');
  return data as T;
}

const token = async () => (await adminClient().auth.getSession()).data.session?.access_token ?? '';

/** Tell the website to show the change now (storefront pages and the Store link in the navigation). */
export async function refreshSite(): Promise<void> {
  try { await fetch('/api/store/revalidate', { method: 'POST', headers: { authorization: `Bearer ${await token()}` } }); } catch { /* it refreshes by itself within minutes */ }
}
export async function siteStatus<T>(): Promise<T | null> {
  try {
    const res = await fetch('/api/store/status', { headers: { authorization: `Bearer ${await token()}` } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch { return null; }
}

const EXT: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' };
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const dimensions = (file: File) => new Promise<{ width: number; height: number } | null>((resolve) => {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => { resolve({ width: img.naturalWidth, height: img.naturalHeight }); URL.revokeObjectURL(url); };
  img.onerror = () => { resolve(null); URL.revokeObjectURL(url); };
  img.src = url;
});

/** Upload one photo to the bucket under products/<product id>/ and register it on the product. */
export async function uploadImage(productId: string, file: File, alt = ''): Promise<{ id: string; path: string }> {
  const ext = EXT[file.type];
  if (!ext) throw new Error(`${file.name}: use a JPEG, PNG, WebP or AVIF image.`);
  if (file.size > MAX_IMAGE_BYTES) throw new Error(`${file.name}: the image is larger than 5 MB.`);
  const path = `products/${productId}/${crypto.randomUUID()}.${ext}`;
  const size = await dimensions(file);
  const up = await adminClient().storage.from(IMAGE_BUCKET).upload(path, file, { contentType: file.type, cacheControl: '31536000', upsert: false });
  if (up.error) throw new Error(`${file.name}: ${up.error.message}`);
  try {
    return await call('store_admin_image_add', { p_product: productId, p_path: path, p_alt: alt, p_width: size?.width ?? null, p_height: size?.height ?? null });
  } catch (e) {
    await adminClient().storage.from(IMAGE_BUCKET).remove([path]);   // do not leave an unlisted file behind
    throw e;
  }
}
export async function removeImage(imageId: string): Promise<void> {
  const path = await call<string | null>('store_admin_image_remove', { p_id: imageId });
  if (path) await adminClient().storage.from(IMAGE_BUCKET).remove([path]);
}
export async function removeFiles(paths: string[]): Promise<void> {
  if (paths.length) await adminClient().storage.from(IMAGE_BUCKET).remove(paths);
}
