import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';
import { LOCALES, LOCALE_COOKIE, LOCALE_INFO, SUGGEST_COOKIE, fromAcceptLanguage, fromCountry, isLocale, localePath, stripLocale } from './config';
import { getContent, sourceContent } from './content';
import { formatCurrency, formatDate, formatNumber, formatYear } from './format';
import { REGION_COOKIE, regionChannels, regionOf, regionOnlyChannels } from './regions';
import { localeSitemapXml, sitemapIndexXml, sitemapLocales } from './sitemap';
import { NON_TEXT_KEYS } from './types';
import { languageAlternates, pageMeta } from '@/app/metadata';
import { PATHS } from '@/lib/site';

const req = (path: string, o: { lang?: string; country?: string; ua?: string; cookie?: string } = {}) => new NextRequest(`https://www.vexaos.io${path}`, { headers: {
  'user-agent': o.ua ?? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Safari/604.1', ...(o.lang ? { 'accept-language': o.lang } : {}),
  ...(o.country ? { 'x-vercel-ip-country': o.country } : {}), ...(o.cookie ? { cookie: o.cookie } : {}) } });
const cookie = (res: Response, name: string) => (res.headers.get('set-cookie') ?? '').split(/,(?=\s*\w+=)/).map((c) => c.trim()).find((c) => c.startsWith(`${name}=`))?.split(';')[0].split('=')[1] ?? null;
const rewrite = (res: Response) => res.headers.get('x-middleware-rewrite');

describe('locales and paths', () => {
  it('serves English at the root and the others under their code', () => {
    expect([...LOCALES]).toEqual(['en', 'th', 'vi', 'id', 'fil']);
    expect([localePath('en', '/platform'), localePath('th', '/platform'), localePath('fil', '/'), localePath('vi', 'mailto:x@y.z'), localePath('id', '//evil.example')])
      .toEqual(['/platform', '/th/platform', '/fil', 'mailto:x@y.z', '//evil.example']);
    expect([stripLocale('/th/products/sensors'), stripLocale('/vi'), stripLocale('/products'), stripLocale('/thai-food')])
      .toEqual([{ locale: 'th', path: '/products/sensors' }, { locale: 'vi', path: '/' }, { locale: 'en', path: '/products' }, { locale: 'en', path: '/thai-food' }]);
    expect([isLocale('fil'), isLocale('sw'), isLocale(null)]).toEqual([true, false, false]);
  });
  it('shows each language under its own name and marks every translation as a machine draft', () => {
    expect(LOCALES.map((l) => LOCALE_INFO[l].name)).toEqual(['English', 'ไทย', 'Tiếng Việt', 'Bahasa Indonesia', 'Filipino']);
    expect(LOCALES.map((l) => LOCALE_INFO[l].reviewStatus)).toEqual(['source', 'machine-draft', 'machine-draft', 'machine-draft', 'machine-draft']);
  });
  it('reads Accept-Language by preference and maps countries to a suggestion', () => {
    expect(fromAcceptLanguage('th-TH,th;q=0.9,en;q=0.8')).toBe('th');
    expect(fromAcceptLanguage('en-US,en;q=0.9,vi;q=0.8')).toBe('en');
    expect(fromAcceptLanguage('fr-FR,fr;q=0.9,id;q=0.5')).toBe('id');
    expect(fromAcceptLanguage('tl-PH')).toBe('fil');
    expect(fromAcceptLanguage('in')).toBe('id');
    expect([fromAcceptLanguage('de,fr;q=0.8'), fromAcceptLanguage('vi;q=0'), fromAcceptLanguage(null)]).toEqual([null, null, null]);
    expect([fromCountry('TH'), fromCountry('vn'), fromCountry('ID'), fromCountry('PH'), fromCountry('US'), fromCountry('KE'), fromCountry(null)]).toEqual(['th', 'vi', 'id', 'fil', null, null, null]);
  });
});

describe('middleware: detection without moving bots or overriding a choice', () => {
  it('serves English from the root with no redirect', () => {
    const res = middleware(req('/platform', { lang: 'en-US,en;q=0.9', country: 'US' }));
    expect([res.status, rewrite(res), cookie(res, LOCALE_COOKIE), cookie(res, SUGGEST_COOKIE)]).toEqual([200, 'https://www.vexaos.io/en/platform', null, null]);
    expect(middleware(req('/en/platform')).headers.get('location')).toBe('https://www.vexaos.io/platform');
  });
  it('redirects once when the browser asks for a supported language, and remembers it', () => {
    const res = middleware(req('/products/sensors', { lang: 'vi-VN,vi;q=0.9,en;q=0.5', country: 'VN' }));
    expect([res.status, res.headers.get('location'), cookie(res, LOCALE_COOKIE)]).toEqual([307, 'https://www.vexaos.io/vi/products/sensors', 'vi']);
    // already on a language URL: served as it is
    expect(middleware(req('/th/platform', { lang: 'vi' })).headers.get('location')).toBeNull();
  });
  it('a saved choice always wins', () => {
    const res = middleware(req('/platform', { lang: 'th', country: 'TH', cookie: `${LOCALE_COOKIE}=en` }));
    expect([res.headers.get('location'), rewrite(res), cookie(res, SUGGEST_COOKIE)]).toEqual([null, 'https://www.vexaos.io/en/platform', null]);
  });
  it('Philippines: English stays, Filipino is offered, nobody is moved', () => {
    const res = middleware(req('/', { lang: 'en-PH,en;q=0.9', country: 'PH' }));
    expect([res.status, res.headers.get('location'), rewrite(res), cookie(res, SUGGEST_COOKIE), cookie(res, LOCALE_COOKIE)]).toEqual([200, null, 'https://www.vexaos.io/en', 'fil', null]);
    // a browser set to Thai in Thailand but reading in English: offered, not moved
    expect(cookie(middleware(req('/', { lang: 'en-GB', country: 'TH' })), SUGGEST_COOKIE)).toBe('th');
    // the offer is not repeated while it stands
    expect(cookie(middleware(req('/', { lang: 'en', country: 'PH', cookie: `${SUGGEST_COOKIE}=fil` })), SUGGEST_COOKIE)).toBeNull();
  });
  it('crawlers and link previews are never redirected and get no cookies', () => {
    for (const ua of ['Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'facebookexternalhit/1.1', 'Mozilla/5.0 (compatible; bingbot/2.0)', 'WhatsApp/2.23', 'GPTBot/1.0']) {
      const res = middleware(req('/platform', { lang: 'th-TH', country: 'TH', ua }));
      expect([ua, res.status, res.headers.get('location'), res.headers.get('set-cookie'), rewrite(res)]).toEqual([ua, 200, null, null, 'https://www.vexaos.io/en/platform']);
    }
    const th = middleware(req('/th/platform', { ua: 'Googlebot/2.1', country: 'US' }));
    expect([th.headers.get('location'), th.headers.get('set-cookie')]).toEqual([null, null]);
  });
  it('notes an African visitor for the regional contact channel', () => {
    expect(cookie(middleware(req('/', { lang: 'en', country: 'KE' })), REGION_COOKIE)).toBe('africa');
    expect(cookie(middleware(req('/', { lang: 'en', country: 'NG', cookie: `${LOCALE_COOKIE}=en` })), REGION_COOKIE)).toBe('africa');
    expect(cookie(middleware(req('/', { lang: 'en', country: 'US' })), REGION_COOKIE)).toBeNull();
    expect([regionOf('ZA'), regionOf('gh'), regionOf('PH'), regionOf(null)]).toEqual(['africa', 'africa', null, null]);
  });
});

describe('content', () => {
  const walk = (src: unknown, tr: unknown, path: string, visit: (s: string, t: string, key: string, path: string) => void, key = '') => {
    if (typeof src === 'string') return visit(src, tr as string, key, path);
    if (Array.isArray(src)) return src.forEach((x, i) => walk(x, (tr as unknown[])[i], `${path}[${i}]`, visit, key));
    if (src && typeof src === 'object') for (const [k, v] of Object.entries(src)) walk(v, (tr as Record<string, unknown>)[k], `${path}.${k}`, visit, k);
  };
  it('every language has the same structure, links, icons and availability labels as English', () => {
    for (const l of LOCALES.filter((x) => x !== 'en')) {
      const c = getContent(l);
      expect(JSON.stringify(c, (k, v) => (typeof v === 'string' && !NON_TEXT_KEYS.has(k) ? '' : v)), l).toBe(JSON.stringify(sourceContent, (k, v) => (typeof v === 'string' && !NON_TEXT_KEYS.has(k) ? '' : v)));
    }
  });
  it('brand names are never translated and placeholders survive', () => {
    const BRANDS = ['VexaOs', 'Restaurant OS', 'AI Insights', 'Edge Gateway', 'Mobile Gateway'];
    for (const l of LOCALES.filter((x) => x !== 'en')) {
      walk(sourceContent, getContent(l), l, (s, t, key, path) => {
        if (NON_TEXT_KEYS.has(key)) return;
        expect(t.trim().length, path).toBeGreaterThan(0);
        expect(t, path).not.toMatch(/VexaOS|Vexaos|VEXAOS(?!\b.*eyebrow)/);
        for (const b of BRANDS) if (s.includes(b)) expect(t, `${path}: ${b}`).toContain(b);
        expect((t.match(/\{[a-z]+\}/g) ?? []).sort(), path).toEqual((s.match(/\{[a-z]+\}/g) ?? []).sort());
      });
    }
  });
  it('the honesty labels are translated in every language', () => {
    for (const l of LOCALES.filter((x) => x !== 'en')) {
      const c = getContent(l).common;
      expect([c.status.available, c.status.development, c.status.soon].every((s, i) => s && s !== Object.values(sourceContent.common.status)[i]), l).toBe(true);
      expect(c.language.draftNotice, l).not.toBe(sourceContent.common.language.draftNotice);
    }
  });
  it('says what the energy features are, in every language', () => {
    const text = JSON.stringify(sourceContent);
    for (const phrase of ['Wi-Fi smart plugs are live today', 'seasonal and time-of-use pricing', 'Standby-draw detection', 'Per-appliance cost breakdown', 'projected month']) expect(text).toContain(phrase);
    for (const l of LOCALES.filter((x) => x !== 'en')) expect(JSON.stringify(getContent(l)), l).toContain('kWh');
  });
});

describe('formats', () => {
  it('uses each language\'s own number, currency and date formats, with the Gregorian year in Thai', () => {
    expect(formatNumber('en', 1234567.5)).toBe('1,234,567.5');
    expect(formatNumber('vi', 1234567.5)).toBe('1.234.567,5');
    expect(formatNumber('id', 1234567.5)).toBe('1.234.567,5');
    expect(formatCurrency('th', 1500)).toMatch(/฿\s?1,500/);
    expect(formatCurrency('vi', 250000)).toMatch(/250\.000\s?₫/);
    expect(formatCurrency('fil', 1500)).toMatch(/₱\s?1,500/);
    const d = new Date(Date.UTC(2026, 9, 10, 12));
    expect(formatYear('th', d)).toBe('2026');
    expect(formatDate('th', d)).toContain('2026');
    expect(formatDate('vi', d)).toMatch(/10.*10.*2026/);
    expect(formatDate('en', d)).toBe('October 10, 2026');
  });
});

describe('regional contact channels stay hidden until configured', () => {
  it('shows nothing without environment values', () => {
    for (const l of LOCALES) expect(regionChannels(l), l).toEqual([]);
    expect(regionOnlyChannels('africa', 'en')).toEqual([]);
    expect(regionOnlyChannels(null, 'en')).toEqual([]);
  });
});

describe('hreflang and sitemaps', () => {
  it('every page lists every language plus x-default', () => {
    expect(languageAlternates('/platform')).toEqual({ en: 'https://www.vexaos.io/platform', th: 'https://www.vexaos.io/th/platform', vi: 'https://www.vexaos.io/vi/platform',
      id: 'https://www.vexaos.io/id/platform', fil: 'https://www.vexaos.io/fil/platform', 'x-default': 'https://www.vexaos.io/platform' });
    expect(languageAlternates('/')['x-default']).toBe('https://www.vexaos.io');
    const m = pageMeta('th', '/contact', { title: 'ติดต่อ', description: 'd' });
    expect([m.alternates?.canonical, Object.keys(m.alternates?.languages ?? {}).length, (m.openGraph as { locale: string }).locale]).toEqual(['https://www.vexaos.io/th/contact', 6, 'th_TH']);
  });
  it('one sitemap per language, listed in the index', () => {
    const when = new Date('2026-10-10T00:00:00Z');
    expect(sitemapLocales(true)).toEqual([...LOCALES]);
    expect(sitemapLocales(false)).toEqual(['en']);
    const index = sitemapIndexXml('https://www.vexaos.io', sitemapLocales(true), when);
    expect(index.match(/<loc>[^<]+<\/loc>/g)).toEqual(LOCALES.map((l) => `<loc>https://www.vexaos.io/sitemaps/${l}.xml</loc>`));
    const th = localeSitemapXml('https://www.vexaos.io', 'th', PATHS, [...LOCALES], when);
    expect(th.match(/<loc>/g)).toHaveLength(PATHS.length);
    expect(th).toContain('<loc>https://www.vexaos.io/th</loc>');
    expect(th).toContain('<xhtml:link rel="alternate" hreflang="fil" href="https://www.vexaos.io/fil/platform"/>');
    expect(th).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://www.vexaos.io/platform"/>');
    expect(th).not.toMatch(/<loc>https:\/\/www\.vexaos\.io\/(platform|vi\/)/);
    expect(th.match(/hreflang=/g)).toHaveLength(PATHS.length * 6);
  });
});
