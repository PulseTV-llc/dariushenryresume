/**
 * Builds the VexaOs icon set from one SVG definition of the orbital mark.
 *
 *   node brand/build-icons.mjs            -> writes the website's icons
 *   node brand/build-icons.mjs --out DIR  -> writes the generic set into DIR
 *
 * The mark is a hand-built SVG recreation of the official icon on
 * brand/vexaos-brand-sheet.png: two crossed elliptical orbits around a bright
 * core, with four dots on a faint ring. PNGs are rendered with headless Chrome
 * (puppeteer-core, already a dependency) so no image toolchain is needed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const CHROME =
  process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

/** Inner markup of the mark in a 100x100 box. `simple` drops ring, dots and glow. */
export function markBody({ simple = false, id = 'vx' } = {}) {
  const w = simple ? 7.5 : 5.2;
  return `
  <defs>
    <linearGradient id="${id}-a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1d4ed8"/><stop offset=".45" stop-color="#2f8bff"/><stop offset="1" stop-color="#67e8f9"/>
    </linearGradient>
    <linearGradient id="${id}-b" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7dd3fc"/><stop offset=".5" stop-color="#22a7f5"/><stop offset="1" stop-color="#1d4ed8"/>
    </linearGradient>
    <radialGradient id="${id}-c" cx=".42" cy=".38" r=".7">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#8fdcff"/><stop offset="1" stop-color="#1d6bf0"/>
    </radialGradient>
    ${simple ? '' : `<filter id="${id}-g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.4"/></filter>`}
  </defs>
  ${
    simple
      ? ''
      : `<circle cx="50" cy="50" r="45.5" fill="none" stroke="#38bdf8" stroke-opacity=".32" stroke-width=".6"/>
  <path d="M50 4.5V95.5M4.5 50H95.5" stroke="#38bdf8" stroke-opacity=".28" stroke-width=".5" stroke-dasharray=".6 2.2"/>
  <g fill="none" stroke-width="${w}" opacity=".55" filter="url(#${id}-g)">
    <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(35 50 50)" stroke="#2f8bff"/>
    <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(-35 50 50)" stroke="#38bdf8"/>
  </g>`
  }
  <g fill="none" stroke-width="${w}">
    <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(35 50 50)" stroke="url(#${id}-a)"/>
    <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(-35 50 50)" stroke="url(#${id}-b)"/>
  </g>
  ${simple ? '' : `<circle cx="50" cy="50" r="13" fill="#38bdf8" opacity=".45" filter="url(#${id}-g)"/>`}
  <circle cx="50" cy="50" r="${simple ? 10 : 9}" fill="url(#${id}-c)"/>
  ${
    simple
      ? ''
      : `<g fill="#7dd3fc"><circle cx="50" cy="4.5" r="2.1"/><circle cx="50" cy="95.5" r="2.1"/><circle cx="4.5" cy="50" r="2.1"/><circle cx="95.5" cy="50" r="2.1"/></g>`
  }`;
}

/** Transparent mark, for dark or light backgrounds. */
export const markSvg = (simple = false) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="VexaOs">${markBody({ simple })}\n</svg>\n`;

/** App icon: the mark on dark navy. radius 0 = full bleed (iOS / maskable). */
export function appIconSvg({ radius = 22.5, scale = 0.72, simple = false } = {}) {
  const off = (100 - 100 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="VexaOs">
  <defs>
    <radialGradient id="bg" cx=".5" cy=".42" r=".75">
      <stop offset="0" stop-color="#10224a"/><stop offset=".6" stop-color="#081228"/><stop offset="1" stop-color="#040916"/>
    </radialGradient>
  </defs>
  <rect width="100" height="100" rx="${radius}" fill="url(#bg)"/>
  ${radius ? `<rect x=".6" y=".6" width="98.8" height="98.8" rx="${radius - 0.6}" fill="none" stroke="#60a5fa" stroke-opacity=".28" stroke-width="1.2"/>` : ''}
  <g transform="translate(${off} ${off}) scale(${scale})">${markBody({ simple })}
  </g>
</svg>
`;
}

/** A .ico that wraps PNGs (valid since Windows Vista; what browsers expect). */
function ico(pngs) {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const dir = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([head, ...dir, ...pngs.map((p) => p.data)]);
}

async function main() {
  const outArg = process.argv.indexOf('--out');
  const generic = outArg > -1;
  const out = generic ? path.resolve(process.argv[outArg + 1]) : path.join(here, '..', 'public');
  fs.mkdirSync(path.join(out, generic ? '.' : 'brand'), { recursive: true });

  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  const png = async (svg, w, h = w, bg = 'transparent') => {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.setContent(
      `<style>html,body{margin:0;background:${bg}}svg{display:block;width:${w}px;height:${h}px}</style>${svg}`
    );
    return Buffer.from(await page.screenshot({ omitBackground: bg === 'transparent', type: 'png' }));
  };
  const write = (rel, data) => {
    fs.mkdirSync(path.dirname(path.join(out, rel)), { recursive: true });
    fs.writeFileSync(path.join(out, rel), data);
    console.log('wrote', rel);
  };

  const rounded = appIconSvg();
  const roundedSmall = appIconSvg({ simple: true, scale: 0.8 });
  const bleed = appIconSvg({ radius: 0, scale: 0.62 });

  if (generic) {
    // Generic set, used by the VexaOs apps.
    write('vexaos-mark.svg', markSvg());
    write('vexaos-mark-simple.svg', markSvg(true));
    write('vexaos-app-icon.svg', rounded);
    write('favicon.svg', roundedSmall);
    write('vexaos-mark-512.png', await png(markSvg(), 512));
    write('vexaos-mark-1024.png', await png(markSvg(), 1024));
    write('icon-1024.png', await png(bleed, 1024, 1024, '#040916'));
    write('adaptive-foreground-1024.png', await png(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g transform="translate(26 26) scale(.48)">${markBody()}</g></svg>`, 1024));
    write('splash-icon-1024.png', await png(markSvg(), 1024));
    write('favicon-32.png', await png(roundedSmall, 32));
    write('favicon-48.png', await png(roundedSmall, 48));
    write('apple-touch-icon.png', await png(bleed, 180, 180, '#040916'));
    write('favicon.ico', ico([
      { size: 16, data: await png(roundedSmall, 16) },
      { size: 32, data: await png(roundedSmall, 32) },
      { size: 48, data: await png(roundedSmall, 48) },
    ]));
  } else {
    write('brand/vexaos-mark.svg', markSvg());
    write('brand/vexaos-mark-simple.svg', markSvg(true));
    write('brand/vexaos-app-icon.svg', rounded);
    write('brand/vexaos-app-icon-1024.png', await png(rounded, 1024));
    write('icon.svg', roundedSmall);
    write('favicon-16x16.png', await png(roundedSmall, 16));
    write('favicon-32x32.png', await png(roundedSmall, 32));
    write('apple-touch-icon.png', await png(bleed, 180, 180, '#040916'));
    write('android-chrome-192x192.png', await png(bleed, 192, 192, '#040916'));
    write('android-chrome-512x512.png', await png(bleed, 512, 512, '#040916'));
    write('favicon.ico', ico([
      { size: 16, data: await png(roundedSmall, 16) },
      { size: 32, data: await png(roundedSmall, 32) },
      { size: 48, data: await png(roundedSmall, 48) },
    ]));
  }
  await browser.close();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
