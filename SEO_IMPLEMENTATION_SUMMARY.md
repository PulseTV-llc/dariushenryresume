# Enterprise SEO — Implementation Summary

Last updated to match the live content of `iamdariushenry.com` as a Private
AI Workflow Systems site (custom Windows AI nodes with NVIDIA GPUs for businesses).

This document is the canonical reference for **what** is implemented and
**where**. Pair it with `ENTERPRISE_SEO_GUIDE.md` for the strategy behind
each decision and `GOOGLE_SEARCH_CONSOLE_SETUP.md` for the post-launch
verification steps.

---

## Pages and Files Owned by SEO

| Concern                              | File                                      |
| ------------------------------------ | ----------------------------------------- |
| Title, description, keywords, OG, Twitter, canonical, hreflang, robots directives | `app/metadata.ts`                          |
| `<head>` schema emission + preconnect | `app/layout.tsx`                          |
| All JSON-LD structured data           | `lib/structured-data.ts`                  |
| Pricing data feeding `AggregateOffer` | `lib/ai-tiers.ts`                          |
| Sitemap                               | `app/sitemap.ts`                          |
| Dynamic robots.txt                    | `app/robots.ts`                           |
| Static robots.txt fallback            | `public/robots.txt`                       |
| PWA manifest                          | `public/site.webmanifest`                 |
| OG image                              | `public/og-image.jpg`                     |
| Favicons & touch icons                | `public/favicon*.png`, `public/apple-touch-icon.png`, `public/android-chrome-*.png` |
| Google Site Verification HTML file    | `public/google1e2547e1f1e95eaf.html`      |

---

## Structured Data — Schemas Emitted on Every Page

`app/layout.tsx` serializes the following JSON-LD blocks into the document
`<body>`. Each is exported from `lib/structured-data.ts`. The order below
mirrors the array in `layout.tsx`.

1. **`Organization`** — `Darius Henry — Private AI Workflow Systems`, with two `ContactPoint` entries (sales + customer support), `sameAs` for LinkedIn/GitHub, and a `knowsAbout` cluster covering private AI infrastructure topics. ID-anchored so other schemas reference it.
2. **`Person`** — Darius Henry, jobTitle `Private AI Workflow Systems Builder`, `worksFor` linked to the Organization, `knowsAbout` aligned with the offering.
3. **`ProfessionalService`** — the bookable service business, `priceRange: "$$$$"`, `areaServed` for US/CA/GB/AU, `serviceType` list, opening hours, and an `hasOfferCatalog` reference to the OfferCatalog schema.
4. **`WebSite`** — site-level entity with `SearchAction` `potentialAction` enabling Google sitelinks search.
5. **`WebPage`** — the homepage, with `speakable` cssSelector (h1, h2, .gradient-text), `mainContentOfPage`, `primaryImageOfPage`, and dynamic `dateModified`.
6. **`OfferCatalog`** — six itemized service offerings: Private AI Assistant, Document Intelligence System, Staff Workflow Automation, Custom Windows AI Node Deployment, Custom AI Dashboard, Monthly AI Optimization.
7. **`AggregateOffer`** — computed from `lib/ai-tiers.ts`. Emits an `Offer` per tier (Starter through Custom Enterprise Architecture) with `priceSpecification.minPrice` / `maxPrice` parsed from each tier's setup range, plus `lowPrice` and `highPrice` for the aggregate.
8. **`ItemList`** (industries) — 10 industries, each modeled as a `Service` (`Private AI Workflow System for {industry}`) under a `ListItem`.
9. **`HowTo`** — seven-step walkthrough of the on-site estimator funnel, with `totalTime: PT5M`, tools (Custom Windows AI Node Cluster, NVIDIA GPU AI Acceleration, Private Document Search Engine), and supplies.
10. **`FAQPage`** — 15 long-form Q&A pairs covering offering, infrastructure, comparison to public AI, pricing, node-count rules of thumb, document types, security, industries, drafting capabilities, client-facing chatbot, integrations, deployment options, timelines, monthly support, and how to get an estimate.
11. **`BreadcrumbList`** — Home → Capabilities → Pricing → Estimate.
12. **`Service`** × 6 — top-level Service entities, one per offering, each linked back to the Organization via `provider`.

All schemas are validated by `next build` (TypeScript) and serialized via
`JSON.stringify`, so a runtime serialization failure would break the build.

---

## Metadata Highlights

- **Title** — `Private AI Workflow Systems for Businesses — Custom Windows GPU AI Nodes | Darius Henry`. Lead keyword first, differentiator second, brand last.
- **Description** — leads with the offering, names the GPU class (RTX 4090 to H100 / H200), lists primary industries, ends with implied benefit.
- **Keyword clusters** in `siteConfig.keywords`:
  - Offering (exact-match buyer intent)
  - Infrastructure (Windows + NVIDIA GPU specific — RTX 4090, RTX 6000 Ada, L40S, H100, H200)
  - Capabilities (document intel, workflow automation, OCR, etc.)
  - Industries (10 verticals)
  - Bottom-of-funnel intent (`how much does private AI cost`, `build private AI for my business`)
  - Comparison intent (`private AI vs ChatGPT for business`)
- **OG image alt text** — descriptive, includes the offering and the NVIDIA GPU range.
- **Twitter cards** — `summary_large_image` with explicit alt text.
- **Robots directives** — `index/follow` with `max-image-preview: large` for rich Google results, `max-snippet: -1` for full text.
- **`alternates.languages`** — `en-US` + `x-default` canonical fallback.
- **`alternates.canonical`** — set to the canonical site URL.

---

## Sitemap

`app/sitemap.ts` emits homepage + the principal section anchors:

- `/` (priority 1.0, weekly)
- `/#capabilities`
- `/#industries`
- `/#services`
- `/#pricing`
- `/#estimate` (priority 0.95 — the primary conversion target)
- `/#about`

---

## Robots

`app/robots.ts` allows all major search and AI crawlers (Googlebot, Bingbot,
GPTBot, ClaudeBot, PerplexityBot, CCBot) with `/api/`, `/_next/`, `/admin/`
disallowed. A static `public/robots.txt` mirrors this as a fallback.

---

## PWA Manifest

`public/site.webmanifest` declares the app as a standalone PWA with the
correct theme color (`#0ea5e9`, matching the cyan accent in the design),
`background_color: #000000`, and `categories: ["business", "productivity",
"utilities"]`.

---

## Performance / Crawl Budget

- `app/layout.tsx` adds `preconnect` for Google Fonts and `dns-prefetch` for Vercel Analytics endpoints.
- `Inter` font loaded with `display: swap` to prevent FOIT.
- All homepage components are statically prerenderable (the homepage builds as ○ Static in `next build`).
- Image assets in `public/` are served by Vercel's edge with automatic compression.

---

## Verification Checklist

After deploying, verify each schema with:

1. **Google Rich Results Test** — paste the live URL; all 12 schemas should detect.
2. **Schema.org Validator** — paste the live URL; no errors.
3. **Bing Webmaster Tools URL Inspection** — confirm pickup.
4. `curl -s https://iamdariushenry.com/sitemap.xml` — confirm 200 + correct URLs.
5. `curl -s https://iamdariushenry.com/robots.txt` — confirm sitemap reference.
6. **Lighthouse SEO score** — should be 100.

---

## Maintenance

- **Pricing changes**: edit `lib/ai-tiers.ts`. The `AggregateOffer` and per-tier `Offer` schemas re-derive automatically on the next build.
- **New service**: add to `servicesList` in `lib/structured-data.ts` and a matching package card in `components/ServicePackages.tsx`.
- **New industry**: add to `industries` in `lib/structured-data.ts` and to the grid in `components/IndustryGrid.tsx`.
- **New FAQ**: append to `faqSchema.mainEntity` in `lib/structured-data.ts`.
- **Sitemap section change**: edit `app/sitemap.ts`.
- **Crawler policy change**: edit `app/robots.ts` (and mirror in `public/robots.txt`).
