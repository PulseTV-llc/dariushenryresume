import Image from 'next/image';
import Link from 'next/link';
import { ImageOff } from 'lucide-react';
import { localePath, type Locale } from '@/lib/i18n/config';
import { imageUrl } from '@/lib/store/config';
import { priceLabel, productText } from '@/lib/store/format';
import type { StoreStrings } from '@/lib/store/strings';
import type { StoreImage, StoreProduct } from '@/lib/store/types';

export function ProductImage({ image, name, t, sizes, priority = false, className = '' }: {
  image: StoreImage | undefined; name: string; t: StoreStrings; sizes: string; priority?: boolean; className?: string;
}) {
  if (!image) {
    return (
      <div className={`flex aspect-square w-full items-center justify-center rounded-2xl bg-slate-100 text-slate-400 ${className}`} role="img" aria-label={t.noPhoto}>
        <ImageOff className="h-8 w-8" aria-hidden="true" />
      </div>
    );
  }
  return (
    <Image src={imageUrl(image.path)} alt={image.alt || t.photoOf.replace('{name}', name)} width={image.width ?? 1200} height={image.height ?? 1200}
           sizes={sizes} priority={priority} className={`aspect-square w-full rounded-2xl bg-white object-cover ${className}`} />
  );
}

/** In stock / made to order / out of stock: said plainly, never implied. */
export function Availability({ product, t }: { product: Pick<StoreProduct, 'available' | 'inventory_mode' | 'lead_time_days' | 'from_cents'>; t: StoreStrings }) {
  if (product.from_cents == null) return null;
  const [label, cls] = !product.available ? [t.outOfStock, 'bg-slate-100 text-slate-700 ring-slate-200']
    : product.inventory_mode === 'made_to_order' ? [t.madeToOrder, 'bg-amber-50 text-amber-800 ring-amber-200']
    : [t.inStock, 'bg-emerald-50 text-emerald-800 ring-emerald-200'];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${cls}`}>{label}</span>;
}

export function ProductCard({ product, locale, t }: { product: StoreProduct; locale: Locale; t: StoreStrings }) {
  const text = productText(product, locale);
  return (
    <Link href={localePath(locale, `/store/${product.slug}`)} className="group block h-full rounded-3xl">
      <article className="glass flex h-full flex-col rounded-3xl p-3 transition group-hover:-translate-y-0.5 group-hover:shadow-xl">
        <ProductImage image={product.images[0]} name={text.name} t={t} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
        <div className="flex flex-1 flex-col p-3">
          <h2 className="text-base font-semibold text-slate-900 group-hover:text-blue-700">{text.name}</h2>
          {text.summary && <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">{text.summary}</p>}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
            <p className="text-base font-semibold text-slate-900">{priceLabel(product, locale, t.from) ?? t.noPrice}</p>
            <Availability product={product} t={t} />
          </div>
        </div>
      </article>
    </Link>
  );
}
