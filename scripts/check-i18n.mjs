#!/usr/bin/env node
/**
 * Translation check. Run: npm run i18n:check
 *
 * Compares every locale in content/ against the English source and reports
 *  - missing strings (fall back to English on the site),
 *  - strings identical to English (possibly untranslated),
 *  - changed inline markers (**bold**, [[accent]]) or placeholders ({name}),
 *  - changed protected values (links, icons, status),
 *  - characters from an unexpected writing system,
 *  - the brand written any way other than "VexaOs".
 * Exits 1 on errors (not on warnings).
 */
import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'content');
const FILES = ['common', 'catalog', 'pages-main', 'pages-products'];
const NON_TEXT = new Set(['type', 'id', 'tinted', 'flip', 'cols', 'icon', 'status', 'shot', 'phone', 'href', 'variant', 'compact', 'event']);
// Scripts allowed per locale, beyond Latin, digits and punctuation.
const SCRIPT = { th: /\p{Script=Thai}/u };
const FOREIGN = /[\p{Script=Devanagari}\p{Script=Cyrillic}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Arabic}\p{Script=Lao}\p{Script=Khmer}]/u;

const load = async (locale, file) => {
  const p = path.join(root, locale, `${file}.ts`);
  if (!existsSync(p)) return null;
  const mod = await import(pathToFileURL(p).href);
  return Object.values(mod)[0];
};
const tokens = (s) => [...s.matchAll(/\*\*|\[\[|\]\]|\{[a-z]+\}/g)].map((m) => m[0]).sort().join(' ');

let errors = 0;
const locales = readdirSync(root).filter((d) => d !== 'en' && existsSync(path.join(root, d, 'common.ts')));

for (const locale of locales) {
  const out = { total: 0, missing: [], same: [], markers: [], protectedChanged: [], foreign: [], brand: [] };
  for (const file of FILES) {
    const en = await load('en', file);
    const tr = await load(locale, file);
    const walk = (a, b, where, key) => {
      if (typeof a === 'string') {
        if (key && NON_TEXT.has(key)) {
          if (b !== undefined && b !== a) out.protectedChanged.push(where);
          return;
        }
        out.total++;
        if (typeof b !== 'string' || !b.trim()) return void out.missing.push(where);
        if (b === a && /[a-z]{4,}\s+[a-z]{3,}/i.test(a)) out.same.push(where);
        if (tokens(a) !== tokens(b)) out.markers.push(where);
        if (FOREIGN.test(b) || (!SCRIPT[locale] && /\p{Script=Thai}/u.test(b))) out.foreign.push(where);
        if (/vexaos(?![.\w])/i.test(b.replace(/VexaOs/g, ''))) out.brand.push(where);
      } else if (Array.isArray(a)) {
        a.forEach((v, i) => walk(v, Array.isArray(b) ? b[i] : undefined, `${where}[${i}]`, key));
      } else if (a && typeof a === 'object') {
        for (const k of Object.keys(a)) walk(a[k], b?.[k], `${where}.${k}`, k);
      }
    };
    walk(en, tr ?? {}, file);
  }
  const bad = out.missing.length + out.markers.length + out.protectedChanged.length + out.foreign.length + out.brand.length;
  errors += out.markers.length + out.protectedChanged.length + out.foreign.length + out.brand.length;
  const pct = (((out.total - out.missing.length) / out.total) * 100).toFixed(1);
  console.log(`\n${locale}: ${out.total} strings, ${pct}% translated${bad ? '' : ', no problems'}`);
  for (const [label, list] of [
    ['missing (falls back to English)', out.missing],
    ['identical to English (check)', out.same],
    ['marker/placeholder mismatch', out.markers],
    ['protected value changed (ignored by the site)', out.protectedChanged],
    ['unexpected writing system', out.foreign],
    ['brand not written "VexaOs"', out.brand],
  ]) {
    if (list.length) console.log(`  ${label}: ${list.length}\n    ${list.slice(0, 12).join('\n    ')}${list.length > 12 ? '\n    …' : ''}`);
  }
}
process.exit(errors ? 1 : 0);
