#!/usr/bin/env node
/**
 * Builds the optimized images for /products/mobile-gateway from the client's three concept renders.
 * Not part of the build and not a dependency: run it by hand when a render changes, with sharp available, e.g.
 *
 *   npm i --no-save --prefix /tmp/mg sharp@0.33.5
 *   NODE_PATH=/tmp/mg/node_modules node scripts/mobile-gateway-assets.mjs <studio.png> <wet.png> <medical.png>
 *
 * studio.png  1448×1086, pure black studio, three-quarter view (hero, closing, LED layer, cut-out)
 * wet.png     1536×1024, wet dark surface, amber/blue light (macro crops, specs header)
 * medical.png 1448×1086, gateway strapped to a clinical cooler (medical concept story, mounting crop)
 *
 * The originals stay out of the repository. Everything written to public/mobile-gateway/ is a resize, a crop,
 * a mask of the original pixels or a blend with the page background (#050609): nothing is repainted.
 */
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const [studio, wet, medical] = process.argv.slice(2);
if (!studio || !wet || !medical) { console.error('usage: mobile-gateway-assets.mjs <studio.png> <wet.png> <medical.png>'); process.exit(1); }

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'mobile-gateway');
mkdirSync(OUT, { recursive: true });
const PAGE_BG = { r: 5, g: 6, b: 9 };

/** Write one image at several widths in AVIF, WebP and a JPEG (or PNG, for alpha) fallback. */
async function variants(input, name, widths, { alpha = false, fallback = true } = {}) {
  const meta = await sharp(input).metadata();
  for (const w of widths) {
    const base = sharp(input).resize({ width: Math.min(w, meta.width), withoutEnlargement: true });
    await base.clone().avif({ quality: alpha ? 60 : 55, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await base.clone().webp({ quality: alpha ? 80 : 78, alphaQuality: 90, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.webp`));
    if (fallback) {
      if (alpha) { if (w === widths[0]) await base.clone().png({ compressionLevel: 9, palette: true, quality: 85, effort: 10 }).toFile(path.join(OUT, `${name}-${w}.png`)) }
      else await base.clone().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(path.join(OUT, `${name}-${w}.jpg`));
    }
  }
}

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// 1. Studio render, its black lifted to exactly the page background ("lighten" blend), so its edges disappear.
const W = 1448, H = 1086;
const studioOnPage = await sharp({ create: { width: W, height: H, channels: 3, background: PAGE_BG } })
  .composite([{ input: studio, blend: 'lighten' }]).png().toBuffer();
await variants(studioOnPage, 'studio', [640, 960, 1280, 1448]);

// 2. The status light alone: the studio render's own blue-dominant pixels (the LED strip and its reflection), on
//    transparency, aligned pixel for pixel with the studio image. Used for the reveal and the closing.
{
  const { data } = await sharp(studio).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const a = smooth(12, 80, b - Math.max(r, g));
    out.set(a > 0.002 ? [r, g, b, Math.round(a * 255)] : [0, 0, 0, 0], i * 4);
  }
  const led = await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
  await variants(led, 'studio-led', [640, 960, 1280, 1448], { alpha: true });
}

// 3. Cut-out of the device from the studio render (for the illustrated scenes): a hand-traced outline (floor and
//    reflections excluded) with a 2 px feather; the outermost band follows the render's own edge brightness.
{
  const POLY = [[126, 484], [168, 436], [250, 408], [317, 390], [936, 286], [1000, 288], [1040, 330], [1090, 338], [1300, 505], [1322, 545], [1318, 600], [1290, 650], [1262, 672], [1178, 684], [580, 834], [500, 812], [418, 815], [372, 808], [336, 782], [322, 735], [124, 500]];
  const pts = POLY.map((p) => p.join(',')).join(' ');
  const svg = (extra = '') => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#000"/><polygon points="${pts}" fill="#fff"/>${extra}</svg>`);
  const antennas = '<polygon points="127,490 160,478 350,715 325,742" fill="#fff"/><polygon points="1035,333 1092,338 1318,540 1275,560" fill="#fff"/>';
  const edge = await sharp(svg()).blur(2.2).greyscale().raw().toBuffer();
  const core = await sharp(svg(antennas)).blur(7).greyscale().raw().toBuffer();
  const { data } = await sharp(studio).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const a = (edge[i] / 255) * Math.max(core[i] > 240 ? 1 : 0, smooth(6, 24, Math.max(l, b * 0.6)));
    out.set([r, g, b, Math.round(a * 255)], i * 4);
  }
  const cut = await sharp(out, { raw: { width: W, height: H, channels: 4 } }).extract({ left: 116, top: 278, width: 1214, height: 564 }).png().toBuffer();
  await variants(cut, 'cutout', [400, 800, 1214], { alpha: true });
}

// 4. Wet-surface render: the material shot for the specifications header.
await variants(wet, 'wet', [640, 960, 1280, 1536]);

// 5. Medical concept render.
await variants(medical, 'medical', [640, 960, 1280, 1448]);

// 6. Macro details: real crops at the render's own resolution (never enlarged).
const DETAILS = {
  texture: [wet, 262, 282, 360, 360],
  fastener: [wet, 96, 226, 320, 320],
  led: [wet, 650, 300, 400, 400],
  pivot: [wet, 1190, 280, 346, 346],
  usbc: [wet, 820, 500, 340, 340],
  mount: [medical, 372, 520, 330, 330],
};
for (const [name, [src, left, top, width, height]] of Object.entries(DETAILS)) {
  const crop = await sharp(src).extract({ left, top, width, height }).png().toBuffer();
  await variants(crop, `detail-${name}`, [width]);
}

// 7. Social card: the studio render on the page background, 1200×630.
await sharp(studioOnPage).extract({ left: 0, top: 160, width: 1448, height: 760 }).resize(1200, 630)
  .jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, 'og.jpg'));

console.log('written to', OUT);
