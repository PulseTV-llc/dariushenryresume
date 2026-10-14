# VexaOs Mobile Gateway launch page

`/products/mobile-gateway` (and `/th/…`, `/vi/…`, `/id/…`, `/fil/…`). The product is **in development**; the page
announces it and collects a launch list. It replaces the earlier short "coming soon" page for this product (the old
copy in `content/*/pages-products.ts` is no longer rendered; the generic `[slug]` route skips this slug).

## Where things are

| What | Where |
|---|---|
| Route, metadata, JSON-LD (Product without offers, FAQPage) | `app/[locale]/products/mobile-gateway/page.tsx` |
| Unsubscribe page (noindex) | `app/[locale]/products/mobile-gateway/unsubscribe/page.tsx` |
| Sections (server components) | `components/mobile-gateway/StorySections.tsx`, `IndustrySections.tsx`, `PlatformSections.tsx` |
| Interactive pieces (client) | `ConnectivitySelector`, `RouteMap` (location map + simulated trip), `CloudDashboard`, `Tabs`, `SpecsToggle`, `EarlyAccessForm`, `Unsubscribe`, `MobileGatewayFx` (scroll motion) |
| Styles and motion | `components/mobile-gateway/mobile-gateway.css` |
| Illustrated scenes | `components/mobile-gateway/scenes/art.tsx`, rendered by `Scene.tsx` |
| Copy, all five languages | `lib/mobile-gateway/i18n/{en,th,vi,id,fil}.ts` (English is the source; the others are machine drafts) |
| Structure (statuses, scene slots, spec row statuses) | `lib/mobile-gateway/config.ts` |
| Hardware vendor names (off) | `lib/mobile-gateway/vendor.ts` |
| Images | `public/mobile-gateway/*`, listed in `lib/mobile-gateway/images.ts`, built by `scripts/mobile-gateway-assets.mjs` |
| Launch list rules, CSV | `lib/mobile-gateway/launch-list.ts`; server helpers `lib/mobile-gateway/server.ts`; API `app/api/launch-list/` |
| Admin | Store admin → **Launch list** tab (owner only): `components/store-admin/LaunchListTab.tsx` |
| Database | IoT repo: `supabase/migrations/20261108090000_marketing_launch_list.sql` (+ rollback, `supabase/tests/marketing.test.ts`) |

## Honesty rules (enforced by `lib/mobile-gateway/claims.test.ts`)

Capabilities are worded as intent (designed to, planned, target, under evaluation, roadmap). No invented numbers,
dates, prices, counts, customers, logos, testimonials or certifications. Technical sections carry
"Coming Soon — Specifications Subject to Change". Demo values (3.8°C, 62%, 28%, 74%, 24°C) are labelled simulated or
illustrative. The medical story always shows "Conceptual application. Not a certified medical monitoring or
life-support device." The test scans every string in every language, the specification values as rendered and the
page's source files for: first, only (except "Wi-Fi-only"/"Cellular-only"), best, fastest, most accurate, most secure,
certified / unlimited / guaranteed (allowed only when negated), IP ratings, MIL-STD, "days/weeks of battery",
multi-day, 5G, FDA, HIPAA compliant, Raspberry, Waveshare. It also proves itself on deliberately bad strings.

**Vendor names.** Customer copy never names the evaluation-board vendors. `SHOW_VENDOR_NAMES` in
`lib/mobile-gateway/vendor.ts` (default `false`) appends the exact names to three specification rows when switched on.

## Images

Three client concept renders; originals are kept out of the repository. `scripts/mobile-gateway-assets.mjs` (run by
hand with sharp, see its header) writes AVIF + WebP + JPEG/PNG at fixed widths. The site serves images unoptimized
(`images.unoptimized` in `next.config.mjs`), so `components/mobile-gateway/Picture.tsx` offers the pre-built variants
with `<picture>`/`srcset`/`sizes`.

| Render | Used for |
|---|---|
| Studio (pure black, three-quarter) | Hero reveal (its black lifted to the page colour #050609, feathered mask), the LED-only layer (its own blue pixels), the closing and the early-access visual, the device cut-out composited into every illustrated scene, the social card (`og.jpg`) |
| Wet surface (amber/blue) | Specifications header; macro crops: surface, fasteners, status light, antenna pivot, USB-C cover |
| Medical cooler concept | Medical story and the "Medical Logistics Concepts" tab (always with the disclosure); the mounting crop |

Every other environment is an **original SVG illustration** with an "Illustrative" tag and the real cut-out shown in
a magnified callout. Nothing repaints the device.

### Replacing an illustration with photography

Add the photo's variants to `public/mobile-gateway/`, register it in `IMAGES` (`lib/mobile-gateway/images.ts`), then set
`photo: { key, credit, position }` on the slot in `lib/mobile-gateway/config.ts` (`STORIES`, `SCENARIOS`). No component
changes. Shot list for the client to commission (the same gateway, real environments, no medical/safety claims implied):

1. Trucking: gateway mounted at the front of a reefer trailer (night or dusk highway, motion blur), plus a close-up of the mount.
2. Agriculture: gateway on a center-pivot tower or a field post, sensor stakes in the rows, golden hour.
3. Cold chain: reefer trailer backed into a loading dock at night, gateway on the trailer.
4. Warehouse: gateway on a rack upright in a cold-storage aisle.
5. Industrial: gateway on a column or machine guard beside equipment on a factory floor.
6. Construction: gateway on an excavator cab or a jobsite tank, under work lights.
7. Utilities: gateway on a pump-house wall with a water tower behind.
8. Energy: gateway on a battery cabinet at a solar site.
9. Portable: gateway in an open hard case with foam cut-out; and in a hand, for scale.
10. Product: rear/underside view showing the mounting provisions; front view with antennas folded out; USB-C cover open.

## Lead capture

Form → `POST /api/launch-list` → `public.marketing_launch_join` (Supabase, schema `marketing`, RLS on, no direct
access). Checks: client and server validation (shared rules), honeypot field, optional Cloudflare Turnstile, rate
limits in the database (5/hour per caller hash, 3/hour per address, 2000/day), duplicates update the existing row with
the same answer (no enumeration). The consent sentence stored is the one the site shows in that language, with
`CONSENT_VERSION` and a timestamp. An unsubscribe token (32 random bytes) is shown to the person after signing up;
only its SHA-256 is stored; signing up again with the same address issues a new link and the previous one stops
working. The unsubscribe page needs a button press (link scanners cannot unsubscribe anyone).

**No email is sent.** The confirmation never mentions email. `sendLaunchConfirmation` in `lib/mobile-gateway/server.ts`
is the hook for a future confirmation email (Resend), which should include the unsubscribe link.

Environment (same Supabase variables as the store):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | already set for the store |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | optional: shows the Turnstile widget |
| `TURNSTILE_SECRET_KEY` | optional: when set, every sign-up must pass Turnstile |

Note: like the store's waitlist, the join function is callable with the public anon key, so a caller who skips the
website also skips the honeypot and Turnstile; the database's validation and rate limits still apply.

## Motion

CSS plus one small script (`MobileGatewayFx`): sticky hero reveal driven by scroll position (no scroll-jacking),
reveals on enter, a "Pause motion" button for every looping animation. With `prefers-reduced-motion` the page is
static and complete (final hero frame, all content visible). No animation hides technical information.
