# Localization

The site is published in English (the source) and four translations.

| Code | Language | Shown as | URL | Review status |
|---|---|---|---|---|
| `en` | English | English | `/…` | source |
| `th` | Thai | ไทย | `/th/…` | **machine-draft** |
| `vi` | Vietnamese | Tiếng Việt | `/vi/…` | **machine-draft** |
| `id` | Indonesian | Bahasa Indonesia | `/id/…` | **machine-draft** |
| `fil` | Filipino | Filipino | `/fil/…` | **machine-draft** |

## Review status: read this before promoting a translation

Every translation was produced by machine and **has not been reviewed by a native speaker**. Each language
carries a flag in `lib/i18n/config.ts`:

```ts
reviewStatus: 'machine-draft'   // or 'reviewed' once a native speaker has signed it off
```

While a language is `machine-draft`:

- its pages show a notice in the footer, in that language, saying the translation is an unreviewed machine
  draft and that the English version is the reference, with a link to English;
- `INDEX_MACHINE_DRAFTS` in `app/metadata.ts` decides whether search engines may index it. It is `true`
  today. Set it to `false` to keep drafts out of search results (pages stay reachable; they also leave the
  sitemaps) until review.

To sign a language off: have a native speaker read the files in `content/<code>/` and
`lib/store/strings.ts`, correct them, then change that language's `reviewStatus` to `'reviewed'`. The
notice disappears for that language only.

## What is never translated, and what must be translated faithfully

- **Brand and product names stay as they are:** VexaOs, VexaOs Edge Gateway, VexaOs Mobile Gateway,
  VexaOs Cloud, AI Insights, Restaurant OS.
- **Honesty labels are translated literally, never softened:** "Available", "In development",
  "Coming soon", "being integrated", "via integration", notes about what is not certified or not built,
  "running on demonstration data", "Made to order", "Out of stock", "Test mode".
- **Structure cannot change.** Links, icons, availability status and layout always come from the English
  source (`NON_TEXT_KEYS` in `lib/i18n/types.ts`); a translation file can only change words. A missing
  string falls back to English.

`npm run i18n:check` reports missing or untranslated strings, changed placeholders or markers, protected
values that differ, unexpected scripts and misspelled brand names. `npm test` checks the same rules plus
routing and detection.

## How a visitor gets a language

1. **Their own choice wins.** Picking a language in the switcher (globe icon in the header, every language
   under its own name; also listed in the footer) stores the cookie `vx_locale` for a year. Nothing
   overrides it.
2. **Browser language.** On a first visit to an English URL, if the browser's `Accept-Language` prefers a
   supported language other than English, the visitor is redirected once to that language and the choice
   is remembered.
3. **Country (Vercel's `x-vercel-ip-country`).** If the country suggests a language the browser did not
   ask for, the visitor is **not moved**. A small banner offers the language (cookie `vx_suggest`, one day).
   Thailand → Thai, Vietnam → Vietnamese, Indonesia → Indonesian, **Philippines → stays in English with
   Filipino offered**.
4. **Crawlers and link previews are never redirected and never get cookies**, so every URL always returns
   the same language to them. `hreflang` tells search engines about the alternatives.

`/en/…` is not a public URL; it redirects to the unprefixed address.

## Search engines

- Every page has a canonical URL and `hreflang` links for all five languages plus `x-default` (English).
- `/sitemap.xml` is an index of one sitemap per language: `/sitemaps/en.xml`, `/sitemaps/th.xml`, … Each
  entry lists its language alternates.
- `<html lang>` is set per language; Open Graph `locale` and JSON-LD `inLanguage` follow.

## Formats and fonts

Numbers, currencies and dates go through `lib/i18n/format.ts` (`Intl`), never hand-built strings. Thai
dates use the Gregorian year. Inter is loaded with the Latin, Latin-extended and Vietnamese subsets; Thai
uses Noto Sans Thai, downloaded only when Thai text is on the page, with a taller line height.

## Regional contact channels (placeholders)

LINE, Zalo and WhatsApp buttons exist in the code but **show nothing until a link is set** in the
environment (and redeployed), so no channel is advertised before someone answers it. Values must be
`https://` links.

| Variable | Shown to |
|---|---|
| `NEXT_PUBLIC_CONTACT_LINE_TH`, `NEXT_PUBLIC_CONTACT_WHATSAPP_TH` | Thai pages |
| `NEXT_PUBLIC_CONTACT_ZALO_VI`, `NEXT_PUBLIC_CONTACT_WHATSAPP_VI` | Vietnamese pages |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_ID`, `NEXT_PUBLIC_CONTACT_LINE_ID` | Indonesian pages |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_FIL` | Filipino pages |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_EN` | English pages |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_AFRICA` | Visitors located in an African country, in any language |

The contact form says, in translated pages, that replies are currently in English.

## Adding a language (for example Swahili, French, Hausa or Amharic for African markets)

1. `lib/i18n/config.ts`: add the code to `LOCALES` and an entry to `LOCALE_INFO` (native name, BCP 47 tag,
   `Intl` locale, currency, countries, `Accept-Language` subtags, `reviewStatus: 'machine-draft'`, the
   suggestion sentence in that language).
2. Copy `content/en/` to `content/<code>/`, translate the words, and register it in `lib/i18n/content.ts`.
3. Add the language to `lib/store/strings.ts`, to `OG_LOCALE` in `app/metadata.ts`, to the Stripe locale
   map in `lib/store/checkout.ts`, and to the small maps in `app/[locale]/not-found.tsx` and
   `lib/i18n/regions.ts`. TypeScript reports each of these until it is done.
4. If the language needs a script Inter does not cover (Amharic/Ethiopic, Arabic), add a font in
   `app/[locale]/layout.tsx` the way Thai is added. Right-to-left languages also need `dir="rtl"` on
   `<html>` and a layout pass; that is not built yet.
5. Run `npm run i18n:check` and `npm test`.

Routes, the switcher, hreflang, sitemaps and detection pick the new language up from the registry.
