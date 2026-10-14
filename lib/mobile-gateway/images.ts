/**
 * The Mobile Gateway page's images: pre-built responsive variants in public/mobile-gateway (made from the client's
 * concept renders by scripts/mobile-gateway-assets.mjs). The site serves images unoptimized, so each image lists the
 * widths that exist; the page asks next/image for the srcset through a loader that only returns those files.
 */
export interface MgImage {
  /** path prefix: files are `${base}-${width}.${ext}` */
  base: string;
  widths: number[];
  width: number;
  height: number;
  /** transparent images: fallback is PNG at the smallest width instead of JPEG at every width */
  alpha?: boolean;
}

const img = (base: string, widths: number[], width: number, height: number, alpha = false): MgImage => ({ base: `/mobile-gateway/${base}`, widths, width, height, alpha });

export const IMAGES = {
  /** render 3: pure black studio, three-quarter view, black lifted to the page background (#050609) */
  studio: img('studio', [640, 960, 1280, 1448], 1448, 1086),
  /** the studio render's own LED pixels on transparency, aligned with `studio` */
  studioLed: img('studio-led', [640, 960, 1280, 1448], 1448, 1086, true),
  /** the device cut out of the studio render, for the illustrated scenes */
  cutout: img('cutout', [400, 800, 1214], 1214, 564, true),
  /** render 1: wet dark surface, amber/blue light */
  wet: img('wet', [640, 960, 1280, 1536], 1536, 1024),
  /** render 2: the medical cooler concept */
  medical: img('medical', [640, 960, 1280, 1448], 1448, 1086),
  'detail-texture': img('detail-texture', [360], 360, 360),
  'detail-fastener': img('detail-fastener', [320], 320, 320),
  'detail-led': img('detail-led', [400], 400, 400),
  'detail-pivot': img('detail-pivot', [346], 346, 346),
  'detail-usbc': img('detail-usbc', [340], 340, 340),
  'detail-mount': img('detail-mount', [330], 330, 330),
} satisfies Record<string, MgImage>;
export type ImageKey = keyof typeof IMAGES;

export const OG_IMAGE = { url: '/mobile-gateway/og.jpg', width: 1200, height: 630 };

/** The smallest existing width that covers `w` (or the largest there is). */
export const pickWidth = (image: MgImage, w: number) => image.widths.find((x) => x >= w) ?? image.widths[image.widths.length - 1];
export const fileFor = (image: MgImage, width: number, ext: 'avif' | 'webp' | 'jpg' | 'png') => `${image.base}-${width}.${ext}`;
/** A srcset of the files that really exist, for one format. */
export const srcSet = (image: MgImage, ext: 'avif' | 'webp' | 'jpg' | 'png') =>
  (ext === 'png' ? [image.widths[0]] : image.widths).map((w) => `${fileFor(image, w, ext)} ${Math.min(w, image.width)}w`).join(', ');
