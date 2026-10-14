import type { CSSProperties } from 'react';
import { IMAGES, fileFor, srcSet, type ImageKey } from '@/lib/mobile-gateway/images';

/**
 * A responsive image from public/mobile-gateway: AVIF, then WebP, then JPEG (PNG for transparent images), each at
 * the widths that were built. The site turns next/image's optimizer off (images.unoptimized in next.config.mjs),
 * so the variants are pre-built and offered here with srcset/sizes; the browser downloads exactly one.
 */
export default function Picture({ image, alt, sizes, priority = false, className = '', imgClassName = '', style, imgStyle, fill = false }: {
  image: ImageKey; alt: string; sizes: string; priority?: boolean; className?: string; imgClassName?: string; style?: CSSProperties; imgStyle?: CSSProperties; fill?: boolean;
}) {
  const im = IMAGES[image];
  const fallback = im.alpha ? 'png' : 'jpg';
  return (
    <picture className={className} style={style}>
      <source type="image/avif" srcSet={srcSet(im, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(im, 'webp')} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element -- see the comment above: pre-built variants in <picture> */}
      <img
        src={fileFor(im, im.alpha ? im.widths[0] : im.widths[Math.min(1, im.widths.length - 1)], fallback)}
        srcSet={srcSet(im, fallback)}
        sizes={sizes}
        alt={alt}
        width={im.width}
        height={im.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        className={`${fill ? 'absolute inset-0 h-full w-full object-cover' : 'block h-auto w-full'} ${imgClassName}`}
        style={imgStyle}
      />
    </picture>
  );
}
