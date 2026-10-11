import { NextResponse, type NextRequest } from 'next/server';
import {
  DEFAULT_LOCALE, LOCALE_COOKIE, SUGGEST_COOKIE, fromAcceptLanguage, fromCountry, isLocale, localePath, stripLocale,
} from '@/lib/i18n/config';

/**
 * Locale routing.
 *
 *  /th/..., /vi/..., /id/..., /fil/...  served as they are.
 *  /en/...                              redirected to the unprefixed URL.
 *  everything else                      is English, served from /en internally.
 *
 * Detection (first visit only, humans only):
 *  1. A saved choice (cookie) always wins. Nothing is redirected.
 *  2. If the browser's Accept-Language asks for a supported language other
 *     than English, redirect once to that language and remember it.
 *  3. Otherwise, if the visitor's country suggests another language, set a
 *     cookie so the page can OFFER it. The visitor is never moved.
 *
 * Crawlers and link previewers are never redirected and never get cookies, so
 * every URL returns the same language to them. hreflang does the rest.
 */
const BOT = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|pinterest|vkshare|w3c_validator|whatsapp|telegram|discord|slack|linkedin|twitter|lighthouse|pagespeed|headless|gtmetrix|preview/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split('/')[1];

  // /en/... is never a public URL.
  if (first === DEFAULT_LOCALE) {
    const url = req.nextUrl.clone();
    url.pathname = stripLocale(pathname).path;
    return NextResponse.redirect(url, 308);
  }

  const prefixed = isLocale(first);
  const current = prefixed ? first : DEFAULT_LOCALE;
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  const isBot = BOT.test(req.headers.get('user-agent') ?? '');

  const serve = () => {
    if (prefixed) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  };

  if (isBot || isLocale(saved)) return serve();

  const wanted = fromAcceptLanguage(req.headers.get('accept-language'));

  // 2. One redirect, from the English URL only, when the browser asks for it.
  if (!prefixed && wanted && wanted !== DEFAULT_LOCALE) {
    const url = req.nextUrl.clone();
    url.pathname = localePath(wanted, pathname);
    const res = NextResponse.redirect(url, 307);
    res.cookies.set(LOCALE_COOKIE, wanted, { path: '/', maxAge: 31536000, sameSite: 'lax' });
    return res;
  }

  // 3. Offer, do not move.
  const res = serve();
  const geo = fromCountry(req.headers.get('x-vercel-ip-country'));
  if (geo && geo !== current && !req.cookies.get(SUGGEST_COOKIE)) {
    res.cookies.set(SUGGEST_COOKIE, geo, { path: '/', maxAge: 86400, sameSite: 'lax' });
  }
  return res;
}

export const config = {
  // Pages only: skip Next internals, the API, admin, and anything with a file extension.
  matcher: ['/((?!_next|api|admin|opengraph-image|.*\\..*).*)'],
};
