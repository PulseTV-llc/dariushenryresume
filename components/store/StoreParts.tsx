import Image from 'next/image';
import Link from 'next/link';
import { ImageOff } from 'lucide-react';
import { localePath, type Locale } from '@/lib/i18n/config';
import { imageUrl } from '@/lib/store/config';
import { priceLabel, productText } from '@/lib/store/format';
import type { StoreStrings } from '@/lib/store/strings';
import type { StoreImage, StoreProduct } from '@/lib/store/types';

/**
 * A product photo, always shown WHOLE: the picture is fitted inside a square box (never cropped) on a soft
 * tinted background, so photos of any shape line up in grids and galleries without layout shift.
 */
export function ProductImage({ image, name, t, sizes, priority = false, className = '' }: {
  image: StoreImage | undefined; name: string; t: StoreStrings; sizes: string; priority?: boolean; className?: string;
}) {
  const box = `relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50 ${className}`;
  if (!image) {
    return (
      <div className={`${box} flex items-center justify-center text-slate-400`} role="img" aria-label={t.noPhoto}>
        <ImageOff className="h-8 w-8" aria-hidden="true" />
      </div>
    );
  }
  return (
    <div className={box}>
      <Image src={imageUrl(image.path)} alt={image.alt || t.photoOf.replace('{name}', name)} fill sizes={sizes} priority={priority} className="object-contain" />
    </div>
  );
}

/** In stock / made to order / out of stock: said plainly, never implied. */
export function Availability({ product, t }: { product: Pick<StoreProduct, 'available' | 'inventory_mode' | 'lead_time_days' | 'from_cents' | 'status'>; t: StoreStrings }) {
  if (product.status === 'coming_soon') return <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-800 ring-1 ring-blue-200">{t.soon.badge}</span>;
  if (product.from_cents == null) return null;
  const [label, cls] = !product.available ? [t.outOfStock, 'bg-slate-100 text-slate-700 ring-slate-200']
    : product.inventory_mode === 'made_to_order' ? [t.madeToOrder, 'bg-amber-50 text-amber-800 ring-amber-200']
    : [t.inStock, 'bg-emerald-50 text-emerald-800 ring-emerald-200'];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${cls}`}>{label}</span>;
}

export function ProductCard({ product, locale, t }: { product: StoreProduct; locale: Locale; t: StoreStrings }) {
  const text = productText(product, locale);
  const soon = product.status === 'coming_soon';
  return (
    <Link href={localePath(locale, `/store/${product.slug}`)} className="group block h-full rounded-3xl">
      <article className="glass flex h-full flex-col rounded-3xl p-3 transition group-hover:-translate-y-0.5 group-hover:shadow-xl">
        {/* coming soon: the photo is slightly muted, the words stay at full contrast */}
        <ProductImage image={product.images[0]} name={text.name} t={t} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className={soon ? 'opacity-70 saturate-[0.8]' : ''} />
        <div className="flex flex-1 flex-col p-3">
          <h2 className="text-base font-semibold text-slate-900 group-hover:text-blue-700">{text.name}</h2>
          {text.summary && <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">{text.summary}</p>}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
            <p className={`text-base font-semibold ${soon ? 'text-slate-600' : 'text-slate-900'}`}>{priceLabel(product, locale, t.from) ?? (soon ? t.soon.priceTba : t.noPrice)}</p>
            <Availability product={product} t={t} />
          </div>
        </div>
      </article>
    </Link>
  );
}
