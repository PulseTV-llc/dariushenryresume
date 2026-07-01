# Enterprise SEO Guide — Private AI Workflow Systems

This is the **strategy** companion to `SEO_IMPLEMENTATION_SUMMARY.md` (the
"what" + "where"). This document explains *why* each lever is set the way
it is, what category of search query it targets, and what to do when you
need to expand or retune.

The site is `iamdariushenry.com`, positioned as **Private AI Workflow
Systems for Businesses — Custom Windows GPU AI Nodes by Darius Henry.**
Every SEO decision is calibrated for a B2B buyer-facing site selling
private AI infrastructure (custom Windows workstations with NVIDIA GPUs)
to real estate firms, law offices, medical/dental practices, restaurants
and franchises, construction, cleaning, film/media, property management,
local services, and insurance agencies.

---

## 1. Strategic Positioning

We compete in three overlapping query spaces:

| Space                  | Example query                                | How we win                                           |
| ---------------------- | -------------------------------------------- | ---------------------------------------------------- |
| **Category creation**  | "private AI workflow system"                 | Own the phrase. Every schema and every keyword cluster uses this exact term. |
| **Infrastructure**     | "Windows GPU AI workstation", "RTX 6000 Ada workstation", "H100 private AI" | Concrete, specific hardware language. NVIDIA GPU model names carry exceptionally high intent. |
| **Industry vertical**  | "AI for law offices", "AI for property management" | Industry grid + per-industry `Service` items in `ItemList`. |
| **Pricing / cost**     | "how much does private AI cost", "private AI pricing", "H100 workstation pricing" | `AggregateOffer` (services pricing) with `lowPrice` and `highPrice`, plus tier-level `Offer` entries with `priceSpecification`. Hardware estimates surface as on-page copy. |
| **Comparison**         | "private AI vs ChatGPT for business"         | Long-form FAQ answer covering the difference. |

We are not competing for "ChatGPT" or "OpenAI" branded queries — those are
contested by the public AI vendors themselves. We compete on the **private,
on-prem, Windows + NVIDIA GPU, business-owned infrastructure** angle.

---

## 2. Title Tag Strategy

The title pattern is:

```
<Primary keyword> for <Audience> — <Differentiator> | <Brand>
```

Currently:

```
Private AI Workflow Systems for Businesses — Custom Windows GPU AI Nodes | Darius Henry
```

Why this works:
- Primary keyword first (Google weights the first 5 words highest).
- Audience clarifier (`for Businesses`) helps disambiguate from consumer AI tools.
- Differentiator (`Custom Windows GPU AI Nodes`) carries the unique infrastructure angle and primes the buyer for the NVIDIA GPU story.
- Brand last. The brand here is the person — Darius Henry — and that strengthens E-E-A-T.
- ~85 characters with separators; Google may truncate at the brand on desktop but the keyword and differentiator both fit in the visible portion.

When to change it: only if the offering itself changes. Do **not** A/B
test by editing the title casually — search rankings will fluctuate.

---

## 3. Meta Description Strategy

```
Custom private AI systems for businesses, powered by Windows AI nodes
with NVIDIA GPUs (RTX 4090 to H100 / H200). Private document search,
business assistants, and workflow automation for real estate, law,
medical, restaurants, and franchise teams.
```

- ~245 characters: under Google's 320-char snippet cap, above the 160-char minimum.
- First clause repeats the offering and names the GPU range (Google may bold the matching query, including the GPU model names).
- Second clause names the highest-intent verticals.
- No fluff, no "we believe", no marketing puffery — just signal.

---

## 4. Keyword Clusters (`siteConfig.keywords`)

Keywords are organized in `app/metadata.ts` into six labeled blocks. Order
matters: search engines weight earlier keywords more.

1. **Offering (exact-match buyer intent)** — `private AI workflow system`, `private AI for business`, `private business AI`, `custom AI for business`, `company AI system`, etc.
2. **Infrastructure (Windows + NVIDIA GPU specific)** — `NVIDIA GPU AI workstation`, `RTX 4090 AI workstation`, `RTX 6000 Ada workstation`, `L40S AI server`, `H100 private AI`, `H200 AI workstation`, `Windows AI server`, `Threadripper Pro AI workstation`, `Xeon W AI workstation`, `on-prem GPU AI`.
3. **Capabilities** — `document intelligence`, `retrieval augmented generation for business`, `AI SOP assistant`, `contract summarization AI`, `OCR document AI`, `client-facing chatbot`.
4. **Industries** — All 10 verticals listed individually for vertical-specific search matches.
5. **Bottom-of-funnel intent** — `build private AI for my business`, `private AI estimate`, `how much does private AI cost`. These are the queries closest to a buying decision.
6. **Comparison intent** — `private AI vs ChatGPT for business`, `alternative to ChatGPT for business`.

When adding keywords: keep them organized by intent cluster, not alphabetized. Don't exceed ~80 keywords — diminishing returns and looks spammy to some crawlers.

---

## 5. Structured Data (JSON-LD)

Twelve schema blocks are emitted on every page via `app/layout.tsx`. See
`SEO_IMPLEMENTATION_SUMMARY.md` for the exhaustive list. Strategic notes:

- **Two identities, one entity graph.** `Organization` is the business; `Person` is Darius. They are linked by `worksFor` so Google understands they belong to the same entity. Both have `sameAs` to LinkedIn and GitHub, which doubles down on authorship signals (E-E-A-T).
- **`ProfessionalService`** is the bookable-business schema. `priceRange: "$$$$"` signals enterprise pricing tier to search engines and removes us from low-budget local-business search results that would waste impressions.
- **`AggregateOffer` is derived, not hand-written.** The Offer entries are computed from `lib/ai-tiers.ts` at build time. If you change tier pricing, the schema follows automatically. This avoids the most common SEO sin — schema drifting out of sync with on-page content, which Google explicitly penalizes.
- **`HowTo` for the estimator.** This is unusual but deliberate. The on-site estimator is a 7-step funnel; modeling it as a `HowTo` gives us a shot at the rich "step-by-step" treatment in search results for queries like "how to estimate private AI cost."
- **`ItemList` for industries.** Each industry is wrapped as a `Service` with the name pattern `Private AI Workflow System for {industry}`. This is the schema-level expression of our vertical strategy — every industry has its own indexable entity inside the list.
- **`FAQPage` with 15 entries.** Answers are intentionally long (3–5 sentences each). Long-form FAQ answers are the single most reliable rich result in Google as of 2025. The answers also embed pricing numbers, node-count rules of thumb, and industry names — high-density signal for question-form queries.
- **`Speakable`** — voice search assistants (Google Assistant, Siri shortcut indexing) pick up the speakable cssSelector. We mark h1, h2, and `.gradient-text` so voice readers get the cleanest version of the headline copy.
- **`@id` anchoring.** Every schema with a reusable identity uses `@id` anchors (e.g. `${SITE_URL}#organization`) and other schemas reference it (`{ '@id': ... }`) instead of duplicating the object. This is the Google-recommended pattern for an entity graph and prevents the "duplicate entity" warnings in Rich Results Test.

When adding a schema: add it to the exports in `lib/structured-data.ts`,
then add it to the `schemas` array in `app/layout.tsx`. Verify on the next
deploy with Google's Rich Results Test.

---

## 6. Robots / Crawl Policy

- All major search bots (Googlebot, Bingbot) allowed everywhere except `/api/`, `/_next/`, `/admin/`.
- AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot) **intentionally allowed**. This is the right call for a B2B offering where being surfaced in ChatGPT, Claude, and Perplexity answer-engine responses is itself a top-of-funnel channel.
- `/admin/` is hard-blocked because it surfaces lead data (Firestore inquiries).
- The dynamic `app/robots.ts` is the canonical source. `public/robots.txt` mirrors it as a fallback in case the dynamic route fails to serve.

If you ever want to block AI crawlers (e.g. for client confidentiality reasons), edit `app/robots.ts` only — `public/robots.txt` is the fallback and serves last.

---

## 7. Sitemap

`app/sitemap.ts` emits the homepage + each in-page section anchor with
calibrated priorities:

- `/` — 1.0
- `/#estimate` — 0.95 (the primary conversion target; second-highest priority on purpose)
- `/#capabilities`, `/#industries`, `/#services`, `/#pricing` — 0.9 each
- `/#about` — 0.6

Hash anchors are included so Google understands the page's section structure and can deep-link via sitelinks.

---

## 8. Performance Signals

Core Web Vitals are part of Google's ranking algorithm. The site is
configured to maximize them:

- **Static prerendering.** The homepage builds as `○ Static` in `next build`. There is no per-request work — the HTML ships pre-baked from Vercel's edge.
- **Font strategy.** `Inter` loaded via `next/font` with `display: swap`. No FOIT, no layout shift from font swap.
- **`preconnect` to Google Fonts** and `dns-prefetch` to Vercel Analytics — small but measurable LCP improvement.
- **No third-party scripts** outside `@vercel/analytics`.
- **No images above the fold** — the hero uses a CSS gradient + animated SVG-free node card. LCP is unblocked.
- **Tailwind purges unused CSS** automatically in production.

---

## 9. E-E-A-T (Expertise, Experience, Authority, Trustworthiness)

For a single-operator B2B service, E-E-A-T is harder than for a brand. The
site addresses it via:

- **Author identity in JSON-LD.** `Person` + `Organization` + `worksFor` linkage. LinkedIn and GitHub on `sameAs`.
- **About section on the page itself.** `#about` explains Darius's background — filmmaker, app developer, business systems builder — without sounding like a resume.
- **FAQ density.** 15 long-form answers covering pricing, hardware, security, deployment, industries. Each answer signals expertise.
- **Specific, verifiable claims.** Pricing tiers, node counts, document type lists. Concrete numbers signal real capability vs. vague marketing copy.
- **No fake reviews.** We do not emit fake `aggregateRating` or `review` schemas; Google penalizes these aggressively. When real reviews exist, add them as `Review` schema entries.

---

## 10. What to Watch After Launch

| Signal                  | Where to check                          | What "good" looks like              |
| ----------------------- | --------------------------------------- | ----------------------------------- |
| Rich result detection   | Google Rich Results Test on `/`         | All 12 schemas detected, 0 errors   |
| Schema validity         | Schema.org validator                    | 0 errors, warnings acceptable        |
| Indexing                | Google Search Console → Coverage        | Homepage indexed within 48h          |
| Click-through rate      | GSC → Performance → Queries             | CTR ≥ 5% on top 10 queries           |
| Core Web Vitals         | GSC → Experience → Core Web Vitals      | All URLs in "Good"                   |
| Sitemap status          | GSC → Sitemaps                          | Submitted, discovered, no errors     |
| Vertical visibility     | GSC → Performance filtered by industry term | Impressions growing month over month |

When CTR drops on a top query, the lever to pull is the **meta description**, not the title. The title is for ranking; the description is for click-through.

---

## 11. When To Expand

- **Adding an industry.** Update three places: `lib/structured-data.ts` (`industries` array), `components/IndustryGrid.tsx`, and `app/metadata.ts` keyword cluster.
- **Adding a service.** Update `lib/structured-data.ts` (`servicesList`), `components/ServicePackages.tsx`, and add a per-service FAQ entry if appropriate.
- **Adding pricing tiers.** Edit `lib/ai-tiers.ts` only — the `AggregateOffer` schema follows automatically.
- **Launching a blog.** Add `BlogPosting` schemas in each post's page. The blog routes already exist at `app/blog/` and have their own metadata pipeline.
- **Adding case studies.** Use the `Article` schema with `author` linked to the `Person` @id, `mentions` linked to the relevant industry `Service`, and `about` linked to the `Organization`. This creates a strong internal knowledge graph that compounds over time.

---

## 12. Anti-patterns To Avoid

- Do not emit fake `Review` or `AggregateRating` schemas. Google penalizes this severely.
- Do not stuff keywords into hidden text or page footers. Search engines detect this immediately and the demote is permanent.
- Do not let the on-page content drift out of sync with the structured data. If pricing changes on the page, the schema must match. (The current setup prevents this by deriving from a single source.)
- Do not change canonical URLs or page slugs without a 301 redirect. We have a clean single-page setup; any new top-level routes should preserve the canonical structure.
- Do not block AI crawlers unless there is a confidentiality requirement. For a product like this, being visible to AI answer engines is itself a marketing channel.
