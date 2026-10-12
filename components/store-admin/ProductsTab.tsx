'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowLeft, ArrowUp, Download, ImagePlus, Loader2, Plus, Trash2 } from 'lucide-react';
import { LOCALES, LOCALE_INFO } from '@/lib/i18n/config';
import { call, refreshSite, removeFiles, removeImage, uploadImage } from '@/lib/store/admin-client';
import {
  addTierRow, applyStepDiscount, emptyForm, formFromProduct, move, newKey, parseMoney, parseOptions, parseTiers, previewProduct, productPayload, readiness,
  slugify, suggestMaxQuantity, tierProblems, tierSummary, variantsFromOptions,
  type ProductForm, type TierForm, type VariantForm,
} from '@/lib/store/admin-logic';
import { imageUrl } from '@/lib/store/config';
import { money, priceLabel } from '@/lib/store/format';
import { rangeLabel } from '@/lib/store/pricing';
import { storeStrings } from '@/lib/store/strings';
import { waitlistCsv, waitlistCsvName, type WaitlistEntry } from '@/lib/store/waitlist';
import type { ProductStatus, StoreCategory, StoreProduct } from '@/lib/store/types';
import { Availability, ProductImage } from '@/components/store/StoreParts';
import { BTN, BTN_QUIET, CARD, INPUT } from './StoreAdmin';

const STATUS_TONE: Record<ProductStatus, string> = { draft: 'bg-slate-100 text-slate-700', active: 'bg-emerald-50 text-emerald-800', archived: 'bg-amber-50 text-amber-800', coming_soon: 'bg-blue-50 text-blue-800' };
const STATUS_NAME: Record<ProductStatus, string> = { draft: 'draft', active: 'active', archived: 'archived', coming_soon: 'coming soon' };
const T = storeStrings('en');
const Label = ({ text, hint, children }: { text: string; hint?: string; children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-slate-800">{text}{children}{hint && <span className="mt-1 block text-xs font-normal text-slate-500">{hint}</span>}</label>
);

/** The people waiting for a coming-soon product: how many, who, and a CSV. Shown only when someone has signed up. */
function Waitlist({ productId, name, slug }: { productId: string; name: string; slug: string }) {
  const [entries, setEntries] = useState<WaitlistEntry[] | null>(null);
  useEffect(() => {
    call<{ entries: WaitlistEntry[] }>('store_admin_waitlist', { p_product: productId }).then((w) => setEntries(w.entries)).catch(() => setEntries([]));
  }, [productId]);
  if (!entries || entries.length === 0) return null;
  const download = () => {
    const url = URL.createObjectURL(new Blob(['\uFEFF', waitlistCsv(name, entries)], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = waitlistCsvName(slug); a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section className={`${CARD} space-y-2`}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold">Waitlist · {entries.length}</h3>
        <button type="button" onClick={download} className={`${BTN_QUIET} !h-10`}><Download className="h-4 w-4" aria-hidden="true" />CSV</button>
      </div>
      <p className="text-xs text-slate-500">People who asked to be told when this is available. Nothing has been sent to them: emailing them comes later.</p>
      <ul className="max-h-56 divide-y divide-slate-100 overflow-y-auto text-sm">
        {entries.map((e) => (
          <li key={e.email} className="flex items-center justify-between gap-3 py-1.5">
            <a href={`mailto:${e.email}`} className="min-w-0 truncate text-blue-700">{e.email}</a>
            <span className="shrink-0 text-xs text-slate-500">{e.locale ?? ''} · {new Date(e.created_at).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Bulk pricing: quantity ranges with a price per unit. One list for the product's own price, and one for any
 * variant that should have its own. The database checks the same rules again when the product is saved.
 */
function BulkPricing({ form, set }: { form: ProductForm; set: (patch: Partial<ProductForm>) => void }) {
  const [scope, setScope] = useState('');
  const [percent, setPercent] = useState('10');
  const owner = scope === '' ? null : form.variants.find((v) => v.key === scope) ?? null;
  const active = scope !== '' && !owner ? '' : scope;
  const cents = (text: string) => { const r = parseMoney(text, form.currency); return 'cents' in r ? r.cents : null; };
  const base = (owner ? cents(owner.price) : null) ?? cents(form.price);
  const rows = form.tiers.filter((r) => r.scope === active);
  const parsed = parseTiers(rows, form.currency);
  const maxQuantity = Math.max(1, Math.floor(Number(form.maxQuantity)) || 0);
  const check = 'tiers' in parsed ? tierProblems(parsed.tiers, base, maxQuantity) : { errors: [parsed.error], warnings: [] };
  const fmt = (c: number) => money(c, form.currency);
  const update = (row: TierForm, patch: Partial<TierForm>) => set({ tiers: form.tiers.map((r) => (r === row ? { ...r, ...patch } : r)) });
  const withMax = (tiers: TierForm[]) => {
    const p = parseTiers(tiers.filter((r) => r.scope === active), form.currency);
    return 'tiers' in p ? { tiers, maxQuantity: String(Math.max(maxQuantity, suggestMaxQuantity(maxQuantity, p.tiers))) } : { tiers };
  };
  const scopes = [{ key: '', label: 'Product price' }, ...form.variants.filter((v) => v.title.trim()).map((v) => ({ key: v.key, label: v.title }))];
  return (
    <section className={`${CARD} space-y-3`}>
      <h3 className="text-base font-semibold">Bulk pricing</h3>
      <p className="text-xs text-slate-500">A lower price per unit when more are bought. Quantity 1 is always the normal price; add ranges such as 2–10 and 11–30. Leave the last “to” empty for “and up”.</p>
      {form.variants.length > 0 && (
        <label className="block text-sm font-medium text-slate-800">Prices for
          <select value={active} onChange={(e) => setScope(e.target.value)} className={`${INPUT} mt-1`}>
            {scopes.map((s) => <option key={s.key} value={s.key}>{s.label}{form.tiers.some((r) => r.scope === s.key) ? ' ✓' : ''}</option>)}
          </select>
          <span className="mt-1 block text-xs font-normal text-slate-500">“Product price” applies to every variant without its own price. A variant with its own price keeps it unless you give it ranges here.</span>
        </label>
      )}
      {rows.length > 0 && (
        <ul className="space-y-2">
          <li className="grid grid-cols-[1fr_1fr_1.3fr_auto] items-center gap-2 text-xs font-medium text-slate-500" aria-hidden="true"><span>From</span><span>To</span><span>Price each</span><span className="w-10" /></li>
          <li className="grid grid-cols-[1fr_1fr_1.3fr_auto] items-center gap-2 text-sm text-slate-500">
            <span className="rounded-xl bg-slate-100 px-3 py-2.5">1</span>
            <span className="rounded-xl bg-slate-100 px-3 py-2.5">{'tiers' in parsed && parsed.tiers[0] ? Math.max(1, parsed.tiers[0].min_qty - 1) : '—'}</span>
            <span className="rounded-xl bg-slate-100 px-3 py-2.5">{base == null ? 'set a price' : fmt(base)}</span><span className="w-10" />
          </li>
          {rows.map((r, i) => {
            const price = cents(r.price);
            const pct = base != null && base > 0 && price != null ? Math.round(((base - price) / base) * 100) : null;
            return (
              <li key={i} className="grid grid-cols-[1fr_1fr_1.3fr_auto] items-start gap-2">
                <input inputMode="numeric" value={r.min} aria-label={`Range ${i + 1}: from quantity`} onChange={(e) => update(r, { min: e.target.value.replace(/\D/g, '') })} className={INPUT} />
                <input inputMode="numeric" value={r.max} placeholder="and up" aria-label={`Range ${i + 1}: to quantity (empty for and up)`} onChange={(e) => update(r, { max: e.target.value.replace(/\D/g, '') })} className={INPUT} />
                <span>
                  <input inputMode="decimal" value={r.price} placeholder="0.00" aria-label={`Range ${i + 1}: price each`} onChange={(e) => update(r, { price: e.target.value })} className={INPUT} />
                  {pct != null && <span className={`mt-0.5 block text-xs ${pct > 0 ? 'text-emerald-700' : 'text-amber-700'}`}>{pct > 0 ? `${pct}% off` : pct === 0 ? 'same as normal' : `${-pct}% more`}</span>}
                </span>
                <button type="button" onClick={() => set({ tiers: form.tiers.filter((x) => x !== r) })} aria-label={`Remove range ${i + 1}`} className="inline-flex h-11 w-10 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => set(withMax(addTierRow(form.tiers, active)))} className={`${BTN_QUIET} !h-10`}><Plus className="h-4 w-4" aria-hidden="true" />Add range</button>
        {rows.length > 0 && (
          <span className="flex items-center gap-2 text-sm text-slate-600">
            <input inputMode="decimal" value={percent} aria-label="Percent cheaper per range" onChange={(e) => setPercent(e.target.value.replace(/[^\d.]/g, ''))} className={`${INPUT} !h-10 !w-16`} />
            <button type="button" disabled={base == null} onClick={() => set({ tiers: applyStepDiscount(form.tiers, active, base, Number(percent), form.currency) })} className={`${BTN_QUIET} !h-10`}>% off per range</button>
          </span>
        )}
      </div>
      {rows.length > 0 && <p className="text-xs text-slate-500">“% off per range” fills in the prices: each range that much cheaper than the one before, starting from the normal price.</p>}
      {check.errors.map((e) => <p key={e} role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-900 ring-1 ring-rose-200">{e}</p>)}
      {check.warnings.map((w) => <p key={w} className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-200">Check: {w}</p>)}
      {'tiers' in parsed && parsed.tiers.length > 0 && base != null && check.errors.length === 0 && (
        <div className="rounded-xl border border-slate-200 p-3 text-sm" aria-label="Bulk price preview">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Shoppers will see</p>
          <p className="mt-1 text-slate-800">{tierSummary(parsed.tiers, base, fmt)}</p>
        </div>
      )}
      <div className="grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800">Largest order (per item)
          <input inputMode="numeric" value={form.maxQuantity} onChange={(e) => set({ maxQuantity: e.target.value.replace(/\D/g, '') })} className={`${INPUT} mt-1`} />
          <span className="mt-1 block text-xs font-normal text-slate-500">The most of this item one order can contain{form.inventory_mode === 'tracked' ? ' (stock on hand still limits it)' : ''}.</span>
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-slate-300 p-3 text-sm">
          <input type="checkbox" checked={form.bulkContact} onChange={(e) => set({ bulkContact: e.target.checked })} className="mt-1" />
          <span><span className="block font-semibold">Offer “contact us” for more</span><span className="block text-xs text-slate-500">Shows “Need more than {maxQuantity || '…'}? Contact us” when a shopper reaches the largest order.</span></span>
        </label>
      </div>
    </section>
  );
}

function Editor({ initial, categories, onClose, onCategories }: {
  initial: StoreProduct | null; categories: StoreCategory[]; onClose: (changed: boolean) => void; onCategories: () => void;
}) {
  const [form, setForm] = useState<ProductForm>(() => (initial ? formFromProduct(initial) : emptyForm()));
  const [busy, setBusy] = useState<'' | 'save' | 'upload' | 'delete'>('');
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [changed, setChanged] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [lang, setLang] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const set = (patch: Partial<ProductForm>) => setForm((f) => ({ ...f, ...patch }));
  const setVariant = (i: number, patch: Partial<VariantForm>) => setForm((f) => ({ ...f, variants: f.variants.map((v, n) => (n === i ? { ...v, ...patch } : v)) }));
  const preview = useMemo(() => previewProduct(form, categories), [form, categories]);
  const missing = readiness(form);

  /** Save and return the product id (a new product needs one before photos can be attached). */
  async function save(quiet = false): Promise<string | null> {
    const built = productPayload(form);
    if ('error' in built) { setNote({ ok: false, text: built.error }); return null; }
    setBusy('save');
    try {
      const saved = await call<StoreProduct>('store_admin_product_save', { p: built.payload });
      setForm(formFromProduct(saved));
      setChanged(true);
      await refreshSite();
      if (!quiet) setNote({ ok: true, text: saved.status === 'active' ? 'Saved. It is on the store now.' : 'Saved.' });
      return saved.id;
    } catch (e) { setNote({ ok: false, text: (e as Error).message }); return null; } finally { setBusy(''); }
  }
  async function addPhotos(files: FileList | null) {
    if (!files?.length) return;
    const id = form.id ?? (await save(true));
    if (!id) return;
    setBusy('upload');
    const problems: string[] = [];
    for (const file of Array.from(files).slice(0, 12)) {
      try {
        const img = await uploadImage(id, file);
        setForm((f) => ({ ...f, images: [...f.images, { id: img.id, path: img.path, alt: '' }] }));
      } catch (e) { problems.push((e as Error).message); }
    }
    setBusy('');
    setChanged(true);
    setNote(problems.length ? { ok: false, text: problems.join(' ') } : { ok: true, text: 'Photos added. Save to keep their order and descriptions.' });
    if (fileInput.current) fileInput.current.value = '';
    refreshSite();
  }
  async function dropPhoto(id: string) {
    try { await removeImage(id); set({ images: form.images.filter((i) => i.id !== id) }); setChanged(true); refreshSite(); }
    catch (e) { setNote({ ok: false, text: (e as Error).message }); }
  }
  async function remove() {
    if (!form.id || !window.confirm(`Delete "${form.name}"? A product that has been ordered is archived instead.`)) return;
    setBusy('delete');
    try {
      const r = await call<{ deleted: boolean; archived: boolean; paths: string[] }>('store_admin_product_delete', { p_id: form.id });
      await removeFiles(r.paths);
      await refreshSite();
      onClose(true);
    } catch (e) { setNote({ ok: false, text: (e as Error).message }); setBusy(''); }
  }
  async function addCategory() {
    const name = newCategory.trim();
    if (!name) return;
    try {
      const c = await call<{ id: string }>('store_admin_category_save', { p_name: name, p_slug: slugify(name) });
      setNewCategory('');
      onCategories();
      set({ category_id: c.id });
    } catch (e) { setNote({ ok: false, text: (e as Error).message }); }
  }
  const tr = (l: string, k: 'name' | 'summary' | 'description', v: string) => set({ translations: { ...form.translations, [l]: { ...form.translations[l], [k]: v } } });

  return (
    <div>
      <div className="sticky top-0 z-30 -mx-3 flex items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/95 px-3 py-2 backdrop-blur sm:-mx-6 sm:px-6">
        <button type="button" onClick={() => onClose(changed)} className="inline-flex h-10 items-center gap-1 text-sm font-semibold text-blue-700"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Products</button>
        <div className="flex items-center gap-2">
          <select aria-label="Status" value={form.status} onChange={(e) => set({ status: e.target.value as ProductStatus })} className={`${INPUT} !h-10 !w-auto`}>
            <option value="draft">Draft</option><option value="coming_soon">Coming soon (shown, not sold)</option><option value="active">Active (on the store)</option><option value="archived">Archived</option>
          </select>
          <button type="button" onClick={() => save()} disabled={busy !== ''} className={`${BTN} !h-10`}>{busy === 'save' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}Save</button>
        </div>
      </div>
      {note && <p role="status" className={`mt-3 rounded-xl px-3 py-2 text-sm ring-1 ${note.ok ? 'bg-emerald-50 text-emerald-900 ring-emerald-200' : 'bg-rose-50 text-rose-900 ring-rose-200'}`}>{note.text}</p>}
      {form.status !== 'active' && missing.length > 0 && <p className="mt-3 text-xs text-slate-500">Before it goes on sale it still needs: {missing.join(', ')}.</p>}

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <section className={`${CARD} space-y-3`}>
            <Label text="Name"><input value={form.name} maxLength={120} onChange={(e) => set({ name: e.target.value, ...(form.slugTouched ? {} : { slug: slugify(e.target.value) }) })} className={`${INPUT} mt-1`} /></Label>
            <Label text="Web address" hint={`vexaos.io/store/${form.slug || '…'}`}>
              <input value={form.slug} onChange={(e) => set({ slug: e.target.value.toLowerCase(), slugTouched: true })} autoCapitalize="none" spellCheck={false} className={`${INPUT} mt-1`} />
            </Label>
            <Label text="Short summary" hint="One or two sentences, shown under the name and in search results.">
              <textarea value={form.summary} maxLength={300} rows={2} onChange={(e) => set({ summary: e.target.value })} className={`${INPUT} mt-1 !h-auto py-2`} />
            </Label>
            <Label text="Description" hint="Plain text. Leave an empty line between paragraphs.">
              <textarea value={form.description} maxLength={8000} rows={6} onChange={(e) => set({ description: e.target.value })} className={`${INPUT} mt-1 !h-auto py-2`} />
            </Label>
            <div className="grid gap-3 sm:grid-cols-2">
              <Label text="Category">
                <select value={form.category_id} onChange={(e) => set({ category_id: e.target.value })} className={`${INPUT} mt-1`}>
                  <option value="">None</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Label>
              <Label text="New category">
                <span className="mt-1 flex gap-2"><input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Mounts" className={INPUT} /><button type="button" onClick={addCategory} className={BTN_QUIET}>Add</button></span>
              </Label>
            </div>
          </section>

          <section className={CARD}>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold">Photos</h3>
              <button type="button" onClick={() => fileInput.current?.click()} disabled={busy !== ''} className={`${BTN_QUIET} !h-10`}>
                {busy === 'upload' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ImagePlus className="h-4 w-4" aria-hidden="true" />}Add photos
              </button>
              <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple hidden onChange={(e) => addPhotos(e.target.files)} />
            </div>
            <p className="mt-1 text-xs text-slate-500">JPEG, PNG, WebP or AVIF, up to 5 MB each, up to 12. The first photo is the main one. Square photos look best.</p>
            <ul className="mt-3 space-y-2">
              {form.images.map((img, i) => (
                <li key={img.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-2">
                  <Image src={imageUrl(img.path)} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                  <input value={img.alt} maxLength={200} placeholder="Describe the photo (for screen readers and search)" aria-label={`Description of photo ${i + 1}`}
                         onChange={(e) => set({ images: form.images.map((x) => (x.id === img.id ? { ...x, alt: e.target.value } : x)) })} className={`${INPUT} min-w-0`} />
                  <span className="flex shrink-0">
                    <button type="button" disabled={i === 0} onClick={() => set({ images: move(form.images, i, -1) })} aria-label="Move up" className="inline-flex h-10 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30"><ArrowUp className="h-4 w-4" aria-hidden="true" /></button>
                    <button type="button" disabled={i === form.images.length - 1} onClick={() => set({ images: move(form.images, i, 1) })} aria-label="Move down" className="inline-flex h-10 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30"><ArrowDown className="h-4 w-4" aria-hidden="true" /></button>
                    <button type="button" onClick={() => dropPhoto(img.id)} aria-label="Remove photo" className="inline-flex h-10 w-9 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
                  </span>
                </li>
              ))}
              {form.images.length === 0 && <li className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">No photos yet.</li>}
            </ul>
          </section>

          <section className={`${CARD} space-y-3`}>
            <h3 className="text-base font-semibold">Price and stock</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Label text={`Price (${form.currency.toUpperCase()})`}><input inputMode="decimal" value={form.price} onChange={(e) => set({ price: e.target.value })} placeholder="0.00" className={`${INPUT} mt-1`} /></Label>
              <Label text="Compare-at price" hint="Optional: shown crossed out."><input inputMode="decimal" value={form.compareAt} onChange={(e) => set({ compareAt: e.target.value })} className={`${INPUT} mt-1`} /></Label>
              <Label text="Currency">
                <select value={form.currency} onChange={(e) => set({ currency: e.target.value })} className={`${INPUT} mt-1`}>{['usd', 'thb', 'vnd', 'idr', 'php', 'eur', 'gbp'].map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}</select>
              </Label>
            </div>
            <fieldset>
              <legend className="text-sm font-medium text-slate-800">Availability</legend>
              <div className="mt-1 grid gap-2 sm:grid-cols-2">
                {([['tracked', 'Keep stock', 'Sold until the count reaches zero.'], ['made_to_order', 'Made to order', 'Always orderable; made after the order.']] as const).map(([value, title, hint]) => (
                  <label key={value} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${form.inventory_mode === value ? 'border-blue-600 bg-blue-50/50' : 'border-slate-300'}`}>
                    <input type="radio" name="inventory_mode" checked={form.inventory_mode === value} onChange={() => set({ inventory_mode: value })} className="mt-1" />
                    <span><span className="block text-sm font-semibold">{title}</span><span className="block text-xs text-slate-500">{hint}</span></span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid grid-cols-2 gap-3">
              {form.inventory_mode === 'tracked' && form.variants.length === 0 && <Label text="In stock"><input inputMode="numeric" value={form.inventory} onChange={(e) => set({ inventory: e.target.value })} className={`${INPUT} mt-1`} /></Label>}
              {form.inventory_mode === 'made_to_order' && <Label text="Lead time (days)" hint="Shown as “Usually ships in N days”."><input inputMode="numeric" value={form.leadTime} onChange={(e) => set({ leadTime: e.target.value })} className={`${INPUT} mt-1`} /></Label>}
            </div>
          </section>

          {form.status === 'coming_soon' && (
            <section className={`${CARD} space-y-3 !border-blue-200`}>
              <h3 className="text-base font-semibold">Coming soon</h3>
              <p className="text-xs text-slate-500">Shown in the store with a “Coming soon” badge. It cannot be added to a cart or bought. A price is optional: without one shoppers see “Price TBA”.</p>
              <Label text="Expected (optional)" hint="Free text, shown as “Expected …”. For example: Spring 2027, or March.">
                <input value={form.expected} maxLength={80} placeholder="Spring 2027" onChange={(e) => set({ expected: e.target.value })} className={`${INPUT} mt-1`} />
              </Label>
              <label className="flex items-start gap-3 rounded-xl border border-slate-300 p-3 text-sm">
                <input type="checkbox" checked={form.notify} onChange={(e) => set({ notify: e.target.checked })} className="mt-1" />
                <span><span className="block font-semibold">Offer “Notify me when available”</span><span className="block text-xs text-slate-500">Shoppers can leave an email. Addresses are collected below; no email is sent automatically yet.</span></span>
              </label>
            </section>
          )}
          {form.id && <Waitlist productId={form.id} name={form.name} slug={form.slug} />}

          <BulkPricing form={form} set={set} />

          <section className={`${CARD} space-y-3`}>
            <h3 className="text-base font-semibold">Options and variants</h3>
            <p className="text-xs text-slate-500">For a product that comes in versions (colour, size). Leave empty for a single item.</p>
            {form.options.map((o, i) => (
              <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2">
                <input value={o.name} placeholder="Color" aria-label="Option name" onChange={(e) => set({ options: form.options.map((x, n) => (n === i ? { ...x, name: e.target.value } : x)) })} className={INPUT} />
                <input value={o.values} placeholder="Black, White" aria-label="Option values, separated by commas" onChange={(e) => set({ options: form.options.map((x, n) => (n === i ? { ...x, values: e.target.value } : x)) })} className={INPUT} />
                <button type="button" onClick={() => set({ options: form.options.filter((_, n) => n !== i) })} aria-label="Remove option" className="inline-flex h-11 w-10 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              {form.options.length < 3 && <button type="button" onClick={() => set({ options: [...form.options, { name: '', values: '' }] })} className={`${BTN_QUIET} !h-10`}><Plus className="h-4 w-4" aria-hidden="true" />Add option</button>}
              {parseOptions(form.options).length > 0 && <button type="button" onClick={() => set({ variants: variantsFromOptions(parseOptions(form.options), form.variants) })} className={`${BTN_QUIET} !h-10`}>Create variants from options</button>}
              <button type="button" onClick={() => set({ variants: [...form.variants, { key: newKey(), title: '', sku: '', price: '', inventory: '0', active: true, option_values: {} }] })} className={`${BTN_QUIET} !h-10`}><Plus className="h-4 w-4" aria-hidden="true" />Add variant</button>
            </div>
            {form.variants.length > 0 && (
              <ul className="space-y-2">
                {form.variants.map((v, i) => (
                  <li key={v.key} className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 p-2 sm:grid-cols-[2fr_1fr_1fr_1fr_auto]">
                    <input value={v.title} placeholder="Name (Black)" aria-label="Variant name" onChange={(e) => setVariant(i, { title: e.target.value })} className={`${INPUT} col-span-2 sm:col-span-1`} />
                    <input value={v.sku} placeholder="SKU" aria-label="SKU" onChange={(e) => setVariant(i, { sku: e.target.value })} className={INPUT} />
                    <input value={v.price} inputMode="decimal" placeholder={form.price || 'Price'} aria-label="Variant price (empty: the product price)" onChange={(e) => setVariant(i, { price: e.target.value })} className={INPUT} />
                    {form.inventory_mode === 'tracked' ? <input value={v.inventory} inputMode="numeric" placeholder="Stock" aria-label="Variant stock" onChange={(e) => setVariant(i, { inventory: e.target.value })} className={INPUT} /> : <span className="hidden sm:block" />}
                    <span className="flex items-center justify-end gap-1">
                      <label className="flex items-center gap-1.5 text-xs text-slate-600"><input type="checkbox" checked={v.active} onChange={(e) => setVariant(i, { active: e.target.checked })} />On sale</label>
                      <button type="button" onClick={() => set({ variants: form.variants.filter((_, n) => n !== i) })} aria-label="Remove variant" className="inline-flex h-10 w-9 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className={`${CARD} space-y-3`}>
            <h3 className="text-base font-semibold">Search engines</h3>
            <Label text="Page title" hint={`${(form.seo_title || form.name).length} of about 60 characters`}><input value={form.seo_title} maxLength={120} placeholder={form.name} onChange={(e) => set({ seo_title: e.target.value })} className={`${INPUT} mt-1`} /></Label>
            <Label text="Description" hint={`${(form.seo_description || form.summary).length} of about 155 characters`}>
              <textarea value={form.seo_description} maxLength={320} rows={2} placeholder={form.summary} onChange={(e) => set({ seo_description: e.target.value })} className={`${INPUT} mt-1 !h-auto py-2`} />
            </Label>
            <div className="rounded-xl border border-slate-200 p-3" aria-label="Search result preview">
              <p className="truncate text-xs text-slate-500">vexaos.io › store › {form.slug || '…'}</p>
              <p className="truncate text-lg text-[#1a0dab]">{(form.seo_title || form.name || 'Product name')} · VexaOs</p>
              <p className="line-clamp-2 text-sm text-slate-600">{form.seo_description || form.summary || 'The short summary appears here.'}</p>
            </div>
          </section>

          <section className={`${CARD} space-y-3`}>
            <h3 className="text-base font-semibold">Translations</h3>
            <p className="text-xs text-slate-500">Optional. Without a translation the English text is shown on the translated pages.</p>
            <div className="flex flex-wrap gap-1.5">
              {LOCALES.filter((l) => l !== 'en').map((l) => (
                <button key={l} type="button" onClick={() => setLang(lang === l ? '' : l)} aria-pressed={lang === l}
                        className={`h-9 rounded-full border px-3 text-sm ${lang === l ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                  {LOCALE_INFO[l].name}{form.translations[l]?.name ? ' ✓' : ''}
                </button>
              ))}
            </div>
            {lang && (
              <div className="space-y-2" lang={lang}>
                <input value={form.translations[lang]?.name ?? ''} placeholder={form.name} aria-label="Translated name" onChange={(e) => tr(lang, 'name', e.target.value)} className={INPUT} />
                <textarea value={form.translations[lang]?.summary ?? ''} placeholder={form.summary} aria-label="Translated summary" rows={2} onChange={(e) => tr(lang, 'summary', e.target.value)} className={`${INPUT} !h-auto py-2`} />
                <textarea value={form.translations[lang]?.description ?? ''} placeholder={form.description} aria-label="Translated description" rows={4} onChange={(e) => tr(lang, 'description', e.target.value)} className={`${INPUT} !h-auto py-2`} />
              </div>
            )}
          </section>

          {form.id && <button type="button" onClick={remove} disabled={busy !== ''} className="inline-flex h-10 items-center gap-2 text-sm font-semibold text-rose-600"><Trash2 className="h-4 w-4" aria-hidden="true" />Delete product</button>}
        </div>

        {/* live preview: what a shopper sees with the form as it is now */}
        <aside className="lg:sticky lg:top-16 lg:h-fit">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Live preview</p>
          <div className="rounded-3xl border border-slate-200 bg-white p-3">
            <ProductImage image={preview.images[0]} name={preview.name} t={T} sizes="400px" />
            <div className="p-3">
              {preview.category && <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">{preview.category.name}</p>}
              <h3 className="text-xl font-bold tracking-tight">{preview.name}</h3>
              {preview.summary && <p className="mt-1 text-sm text-slate-600">{preview.summary}</p>}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-lg font-bold">{priceLabel(preview, 'en', T.from) ?? (preview.status === 'coming_soon' ? T.soon.priceTba : T.noPrice)}</span>
                {preview.compare_at_cents != null && preview.from_cents != null && preview.compare_at_cents > preview.from_cents && <span className="text-sm text-slate-500 line-through">{money(preview.compare_at_cents, preview.currency)}</span>}
                <Availability product={preview} t={T} />
              </div>
              {preview.inventory_mode === 'made_to_order' && preview.lead_time_days != null && <p className="mt-1 text-xs text-slate-500">{T.leadTime.replace('{days}', String(preview.lead_time_days))}</p>}
              {preview.variants.length > 0 && <p className="mt-2 text-xs text-slate-500">{preview.variants.map((v) => v.title).filter(Boolean).join(' · ')}</p>}
              {(preview.price_tiers ?? []).filter((x) => x.variant_id === null).length > 0 && preview.price_cents != null && (
                <p className="mt-2 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs text-slate-700"><span className="font-semibold">{T.bulk.title}:</span>{' '}
                  {(preview.price_tiers ?? []).filter((x) => x.variant_id === null).map((x) => `${rangeLabel(x.min_qty, x.max_qty)} ${money(x.unit_cents, preview.currency)}`).join(' · ')}</p>
              )}
              {preview.status === 'coming_soon' && preview.expected_text && <p className="mt-2 text-xs font-medium text-slate-700">{T.soon.expected.replace('{when}', preview.expected_text)}</p>}
              <span className={`mt-3 inline-flex h-10 items-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white ${preview.status === 'coming_soon' ? 'opacity-50' : 'opacity-90'}`}>{preview.status === 'coming_soon' ? T.soon.badge : preview.from_cents != null && preview.available ? T.addToCart : T.contactToOrder}</span>
              {preview.notify_enabled && <p className="mt-2 text-xs text-slate-500">+ {T.soon.notifyTitle}</p>}
              {preview.description && <p className="mt-3 line-clamp-6 whitespace-pre-line text-sm text-slate-700">{preview.description}</p>}
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">{form.status === 'active' ? 'Active: visible on the store.' : form.status === 'coming_soon' ? 'Coming soon: visible on the store, cannot be bought.' : form.status === 'draft' ? 'Draft: not visible on the store.' : 'Archived: hidden from the store.'} “Add to cart” appears once checkout is open; until then shoppers see “Contact to order”.</p>
        </aside>
      </div>
    </div>
  );
}

export default function ProductsTab() {
  const [data, setData] = useState<{ products: StoreProduct[]; categories: StoreCategory[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<StoreProduct | 'new' | null>(null);
  const load = useCallback(() => call<{ products: StoreProduct[]; categories: StoreCategory[] }>('store_admin_products').then((d) => { setData(d); setError(null); }).catch((e) => setError(e.message)), []);
  useEffect(() => { load(); }, [load]);

  if (error) return <p role="alert" className="text-sm text-rose-600">{error}</p>;
  if (!data) return <Loader2 className="h-5 w-5 animate-spin text-slate-400" aria-label="Loading" />;
  if (editing) {
    return <Editor key={editing === 'new' ? 'new' : editing.id} initial={editing === 'new' ? null : editing} categories={data.categories}
                   onCategories={load} onClose={(changed) => { setEditing(null); if (changed) load(); }} />;
  }
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">{data.products.length} product{data.products.length === 1 ? '' : 's'} · {data.products.filter((p) => p.status === 'active').length} on sale · {data.products.filter((p) => p.status === 'coming_soon').length} coming soon</p>
        <button type="button" onClick={() => setEditing('new')} className={BTN}><Plus className="h-4 w-4" aria-hidden="true" />New product</button>
      </div>
      <ul className="mt-3 space-y-2">
        {data.products.map((p) => (
          <li key={p.id}>
            <button type="button" onClick={() => setEditing(p)} className={`${CARD} flex w-full items-center gap-3 text-left hover:border-blue-300`}>
              {p.images[0]
                ? <Image src={imageUrl(p.images[0].path)} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                : <span className="h-14 w-14 shrink-0 rounded-xl bg-slate-100" aria-hidden="true" />}
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{p.name}</span>
                <span className="block truncate text-sm text-slate-500">
                  {priceLabel(p, 'en', T.from) ?? 'No price'} · {p.inventory_mode === 'made_to_order' ? 'made to order' : `${p.variants.length ? p.variants.reduce((n, v) => n + (v.inventory ?? 0), 0) : p.inventory ?? 0} in stock`} · {p.sold ?? 0} sold{p.waitlist ? ` · ${p.waitlist} waiting` : ''}
                </span>
              </span>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_TONE[p.status]}`}>{STATUS_NAME[p.status]}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
