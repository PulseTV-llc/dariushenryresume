'use client';

import { useState } from 'react';
import { Expand } from 'lucide-react';
import type { StoreStrings } from '@/lib/store/strings';
import type { StoreImage } from '@/lib/store/types';
import { ProductImage } from './StoreParts';
import Lightbox from './Lightbox';

/** Product photos: the whole picture, never cropped. Click the main one for the full-screen viewer. */
export default function Gallery({ images, name, t }: { images: StoreImage[]; name: string; t: StoreStrings }) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const label = (n: number) => t.lightbox.open.replace('{n}', String(n)).replace('{total}', String(images.length));
  return (
    <div>
      <div className="glass rounded-3xl p-2">
        {images.length === 0 ? <ProductImage image={undefined} name={name} t={t} sizes="(min-width: 1024px) 45vw, 100vw" /> : (
          <button type="button" onClick={() => setOpen(true)} aria-label={label(current + 1)} aria-haspopup="dialog" className="group relative block w-full cursor-zoom-in rounded-2xl">
            <ProductImage image={images[current]} name={name} t={t} sizes="(min-width: 1024px) 45vw, 100vw" priority />
            <span className="pointer-events-none absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-slate-700 shadow-md transition group-hover:bg-white group-hover:text-blue-700 motion-reduce:transition-none" aria-hidden="true">
              <Expand className="h-4 w-4" />
            </span>
          </button>
        )}
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <li key={img.id}>
              <button type="button" onClick={() => setCurrent(i)} aria-label={t.lightbox.show.replace('{n}', String(i + 1))} aria-pressed={i === current}
                      className={`block w-full rounded-xl p-0.5 ring-2 ${i === current ? 'ring-blue-600' : 'ring-transparent hover:ring-slate-300'}`}>
                <ProductImage image={img} name={name} t={t} sizes="120px" className="!rounded-lg" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && <Lightbox images={images} name={name} t={t} index={current} onIndex={setCurrent} onClose={() => setOpen(false)} />}
    </div>
  );
}
