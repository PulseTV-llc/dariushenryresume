# Google Search Console — Setup & Post-Launch Checklist

This file walks through verifying `iamdariushenry.com` (Private AI Workflow
Systems site) in Google Search Console and submitting it for indexing.

---

## Site verification

Verification file already deployed at:

```
https://iamdariushenry.com/google1e2547e1f1e95eaf.html
```

### Steps

1. Open https://search.google.com/search-console
2. Add a new property → **URL prefix** → `https://iamdariushenry.com`
3. Choose **HTML file** verification → "Verify"
4. Google fetches `/google1e2547e1f1e95eaf.html` and confirms ownership.

### Alternative: meta tag verification

If you want a second verification path (recommended — survives the HTML file getting deleted), set `verification.google` in `app/metadata.ts` to the meta-tag verification code:

```ts
verification: {
  google: 'YOUR_VERIFICATION_CODE_HERE',
},
```

Then redeploy. Google reads the `<meta name="google-site-verification">` tag from the homepage's `<head>`.

---

## Submit the sitemap

1. In Search Console → **Sitemaps**
2. Add: `sitemap.xml`
3. Submit → status should flip to "Success" within minutes.

The sitemap (`app/sitemap.ts`) emits:

- `/`
- `/#capabilities`
- `/#industries`
- `/#services`
- `/#pricing`
- `/#estimate`
- `/#about`

---

## Request indexing for the homepage

1. Search Console → **URL Inspection**
2. Paste `https://iamdariushenry.com`
3. Click **Request Indexing**

Google typically picks the homepage up within 24–72 hours.

---

## Verify the structured data

After the homepage is indexed:

1. **Google Rich Results Test** — https://search.google.com/test/rich-results
   Paste `https://iamdariushenry.com`. Expect detection of:
   - `Organization`
   - `Person`
   - `ProfessionalService`
   - `WebSite` (with SearchAction)
   - `WebPage` (with Speakable)
   - `OfferCatalog`
   - `AggregateOffer`
   - `ItemList`
   - `HowTo`
   - `FAQPage`
   - `BreadcrumbList`
   - Multiple `Service` entries

2. **Schema.org Validator** — https://validator.schema.org/
   Paste the live URL. Confirm 0 errors.

3. **Mobile-Friendly Test** — https://search.google.com/test/mobile-friendly
   Expect "Page is mobile friendly."

---

## Bing Webmaster Tools (do this too)

1. https://www.bing.com/webmasters
2. Import the property from Google Search Console (one-click) — Bing reuses verification.
3. Submit `https://iamdariushenry.com/sitemap.xml`.

Bing search powers DuckDuckGo and Yahoo, so this is a free distribution gain.

---

## What to watch in the first 30 days

| Metric                                              | Expected            | Where                                           |
| --------------------------------------------------- | ------------------- | ----------------------------------------------- |
| Homepage indexed                                    | Within 72 h         | Search Console → URL Inspection                 |
| Sitemap status                                      | Discovered, no errors | Search Console → Sitemaps                       |
| Rich result eligibility (FAQ, HowTo, Breadcrumb)    | Eligible            | Search Console → Enhancements                   |
| Core Web Vitals                                     | "Good" on all URLs  | Search Console → Experience → Core Web Vitals   |
| Branded query CTR ("Darius Henry AI", "iamdariushenry.com") | ≥ 30%               | Search Console → Performance → filter by Brand  |
| Non-branded impressions ("private AI workflow system", "RTX 6000 Ada workstation", "H100 private AI", etc.) | Growing month over month | Search Console → Performance                    |

---

## High-intent queries to track

Manually add these to Search Console's "Compare queries" view:

- `private AI workflow system`
- `private AI for business`
- `NVIDIA H100 private AI`
- `RTX 4090 AI workstation`
- `RTX 6000 Ada workstation`
- `Windows AI workstation`
- `private GPU AI for business`
- `private AI assistant for company`
- `how much does private AI cost`
- `AI for law offices`
- `AI for real estate`
- `AI for dental offices`
- `AI for property management`
- `AI for restaurants`
- `private AI vs ChatGPT for business`
- `on-prem AI for business`

These are the queries the site is engineered to compete on. Monitor
impressions for each weekly for the first 90 days.

---

## When verification fails

- Confirm `https://iamdariushenry.com/google1e2547e1f1e95eaf.html` returns 200 with `curl`.
- Confirm Vercel is serving `public/` for the production deploy.
- If the file 404s on production, the deploy is using the wrong project — see `vercel.json` at the repo root.
- Add `verification.google` in `app/metadata.ts` as a backup meta-tag verification path.
