'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowLeft, ArrowUp, ImagePlus, Loader2, Plus, Trash2 } from 'lucide-react';
import { LOCALES, LOCALE_INFO } from '@/lib/i18n/config';
import { call, refreshSite, removeFiles, removeImage, uploadImage } from '@/lib/store/admin-client';
import {
  emptyForm, formFromProduct, move, parseOptions, previewProduct, productPayload, readiness, slugify, variantsFromOptions,
  type ProductForm, type VariantForm,
} from '@/lib/store/admin-logic';
import { imageUrl } from '@/lib/store/config';
import { money, priceLabel } from '@/lib/store/format';
import { storeStrings } from '@/lib/store/strings';
import type { ProductStatus, StoreCategory, StoreProduct } from '@/lib/store/types';
import { Availability, ProductImage } from '@/components/store/StoreParts';
import { BTN, BTN_QUIET, CARD, INPUT } from './StoreAdmin';

const STATUS_TONE: Record<ProductStatus, string> = { draft: 'bg-slate-100 text-slate-700', active: 'bg-emerald-50 text-emerald-800', archived: 'bg-amber-50 text-amber-800' };
const T = storeStrings('en');
const Label = ({ text, hint, children }: { text: string; hint?: string; children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-slate-800">{text}{children}{hint && <span className="mt-1 block text-xs font-normal text-slate-500">{hint}</span>}</label>
);

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
            <option value="draft">Draft</option><option value="active">Active (on the store)</option><option value="archived">Archived</option>
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
              <button type="button" onClick={() => set({ variants: [...form.variants, { title: '', sku: '', price: '', inventory: '0', active: true, option_values: {} }] })} className={`${BTN_QUIET} !h-10`}><Plus className="h-4 w-4" aria-hidden="true" />Add variant</button>
            </div>
            {form.variants.length > 0 && (
              <ul className="space-y-2">
                {form.variants.map((v, i) => (
                  <li key={v.id ?? `n${i}`} className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 p-2 sm:grid-cols-[2fr_1fr_1fr_1fr_auto]">
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
                <span className="text-lg font-bold">{priceLabel(preview, 'en', T.from) ?? T.noPrice}</span>
                {preview.compare_at_cents != null && preview.from_cents != null && preview.compare_at_cents > preview.from_cents && <span className="text-sm text-slate-500 line-through">{money(preview.compare_at_cents, preview.currency)}</span>}
                <Availability product={preview} t={T} />
              </div>
              {preview.inventory_mode === 'made_to_order' && preview.lead_time_days != null && <p className="mt-1 text-xs text-slate-500">{T.leadTime.replace('{days}', String(preview.lead_time_days))}</p>}
              {preview.variants.length > 0 && <p className="mt-2 text-xs text-slate-500">{preview.variants.map((v) => v.title).filter(Boolean).join(' · ')}</p>}
              <span className="mt-3 inline-flex h-10 items-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white opacity-90">{preview.from_cents != null && preview.available ? T.addToCart : T.contactToOrder}</span>
              {preview.description && <p className="mt-3 line-clamp-6 whitespace-pre-line text-sm text-slate-700">{preview.description}</p>}
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">{form.status === 'active' ? 'Active: visible on the store.' : form.status === 'draft' ? 'Draft: not visible on the store.' : 'Archived: hidden from the store.'} “Add to cart” appears once checkout is open; until then shoppers see “Contact to order”.</p>
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
        <p className="text-sm text-slate-600">{data.products.length} product{data.products.length === 1 ? '' : 's'} · {data.products.filter((p) => p.status === 'active').length} on the store</p>
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
                  {priceLabel(p, 'en', T.from) ?? 'No price'} · {p.inventory_mode === 'made_to_order' ? 'made to order' : `${p.variants.length ? p.variants.reduce((n, v) => n + (v.inventory ?? 0), 0) : p.inventory ?? 0} in stock`} · {p.sold ?? 0} sold
                </span>
              </span>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_TONE[p.status]}`}>{p.status}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
