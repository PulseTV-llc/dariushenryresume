'use client';

import { useState } from 'react';
import type { StoreStrings } from '@/lib/store/strings';
import type { StoreImage } from '@/lib/store/types';
import { ProductImage } from './StoreParts';

export default function Gallery({ images, name, t }: { images: StoreImage[]; name: string; t: StoreStrings }) {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <div className="glass rounded-3xl p-2">
        <ProductImage image={images[current]} name={name} t={t} sizes="(min-width: 1024px) 45vw, 100vw" priority />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <li key={img.id}>
              <button type="button" onClick={() => setCurrent(i)} aria-label={`${t.photoOf.replace('{name}', name)} ${i + 1}`} aria-pressed={i === current}
                      className={`block w-full rounded-xl p-0.5 ring-2 ${i === current ? 'ring-blue-600' : 'ring-transparent hover:ring-slate-300'}`}>
                <ProductImage image={img} name={name} t={t} sizes="120px" className="!rounded-lg" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
