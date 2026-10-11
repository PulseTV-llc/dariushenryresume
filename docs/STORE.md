# VexaOs Store

The store sells hardware and accessories at `/store`, with an admin dashboard at `/admin/store`.
Products, photos and orders live in the VexaOs Supabase project in their own schema, `store`, which is
separate from the monitoring platform's data. Payments go through Stripe Checkout.

## What a visitor sees

| State | What the site shows |
|---|---|
| No active product | No "Store" link in the navigation. `/store` says nothing is on sale yet (not indexed). |
| Active products, Stripe not set up | Products with prices and a **Contact to order** button. No cart checkout. |
| Active products, Stripe set up | **Add to cart**, cart, and Stripe Checkout. In test mode the cart says so. |

Every label about availability is literal: *In stock* (stock is counted), *Made to order* (made after the
order, with a lead time if you enter one), *Out of stock*. Translated pages (th, vi, id, fil) use machine-draft
interface text (`lib/store/strings.ts`); a product shows its own translation if you entered one, else English.

## The hero on `/store`

The dark card at the top (`components/store/StoreHero.tsx`, styles under "Store hero" in `app/globals.css`)
always shows the brand: the living VexaOs mark and the sensor → Edge Gateway → cloud → apps flow. It never shows
a product photo. With nothing on sale the first button becomes "Ask about mounts". Its three chips are computed
from the catalog and settings (`lib/store/hero.ts`): what the hardware is for; "Made to order" or "In stock" only
when that is true of everything on sale, otherwise how you pay; and shipping. All motion stops for visitors who
prefer reduced motion. Screenshot: `docs/design/screenshots/store-hero.png`.

## Product photos

Photos are always shown whole, never cropped: fitted inside a square box on a soft background in the grid and
the product gallery, and in their own shape in the hero. Clicking the main photo on a product page opens a
full-screen viewer (`components/store/Lightbox.tsx`): arrows, keyboard and swipe to change photo; scroll wheel,
click, double-tap, pinch or the buttons to zoom (up to 4x), then drag to pan; thumbnails, a counter and the
photo's description; Esc, the X or the dark area to close.

## Bulk pricing

A product can cost less per unit in quantity ranges, set in the admin under **Bulk pricing**: rows of
"from – to – price each" (for example 2–10, 11–30, 31 and up). Quantity 1 is always the normal price.

- Ranges must follow each other with no gaps or overlaps; only the last may be open-ended. The admin shows what
  is wrong as you type and the database refuses anything else.
- **Largest order** is the most of one item an order may contain (10 unless changed, up to 10,000). It cannot lie
  beyond a closed last range. With **Offer "contact us" for more**, shoppers at the limit see a contact link.
- **"% off per range"** fills the prices in: each range that much cheaper than the one before.
- A range that costs more than the previous one, or no less than the normal price, is allowed but flagged.
- Variants: "Product price" ranges apply to every variant without its own price. A variant with its own price
  keeps it unless you give it its own ranges (choose it under "Prices for").
- Shoppers see a "Buy more, save" table; the price follows the quantity, with "You save …". The cart shows the
  bulk price per line.
- The price charged is worked out by the database from the quantity (`store.unit_price`), never taken from the
  browser. Each order line keeps the unit price, the normal price and the range that applied, so later price
  changes do not alter past orders. Stock on hand still limits what can be ordered.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | Secret? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | no | Catalog, admin sign-in |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | no (publishable) | Catalog, admin sign-in |
| `STRIPE_SECRET_KEY` | **yes** | Creates Checkout sessions. Use the **test** key (`sk_test_…`). |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | no | Marks Stripe as set up (`pk_test_…`). |
| `STRIPE_WEBHOOK_SECRET` | **yes** | Verifies that webhook calls really come from Stripe (`whsec_…`). |
| `SUPABASE_SERVICE_ROLE_KEY` | **yes** | Lets the webhook record orders and take items out of stock. |
| `STORE_SHIP_COUNTRIES` | no | Optional. Comma-separated country codes Checkout accepts. Default `US`. |
| `STORE_SHIPS_FROM` | no | Optional. A country code (for example `US`). When set, the store's hero says "Ships from …"; unset, it says where it ships **to** and makes no claim about the origin. |
| `STORE_LIVE_PAYMENTS` | no | Optional. Set to `on` to allow live keys. Without it only test keys work. |

Checkout opens only when all four of `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
`STRIPE_WEBHOOK_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` are present, so a payment is never taken
that the site could not record. Until then the store shows "Contact to order". Redeploy after changing a
variable. `/admin/store` → Settings shows which ones are present (yes/no only, never the values).

## Stripe webhook

- **URL:** `https://<your site>/api/store/webhook` (production: `https://www.vexaos.io/api/store/webhook`)
- **Events:** `checkout.session.completed`, `checkout.session.async_payment_succeeded`,
  `checkout.session.async_payment_failed`, `charge.refunded`
- Copy the endpoint's signing secret into `STRIPE_WEBHOOK_SECRET`.

Preview deployments behind Vercel's login cannot be reached by Stripe. Test the webhook on a public URL, or
locally with `stripe listen --forward-to localhost:3000/api/store/webhook`.

What the webhook does: verifies the signature on the raw body; ignores sessions this site did not create;
when a session is **paid**, reads the charged items from Stripe and records the order once (a repeated or
second event for the same session changes nothing) and reduces stock, never below zero (an order that sold
more than was on hand is flagged "oversold"); marks an order refunded when Stripe reports a refund. If the
database cannot be reached it answers 500 and Stripe retries.

## Prices

The browser sends only product ids and quantities. `POST /api/store/checkout` asks the database
(`public.store_quote`) for names, prices and availability and builds the Stripe session from that answer.
A price in the request body is ignored.

## Admin (`/admin/store`)

The admin also has its own address, **https://admin.vexaos.io** (`ADMIN_HOST`): on that host `/` is the store
admin, `/admin/...` and `/api/...` work as usual, every other page goes back to the admin, nothing is indexed and
no language detection runs. `/admin/store` on the main site keeps working. In Vercel the domain is attached to
the project; until the site is live it is assigned to the git branch `feat/platform-company-site` and must be
re-pointed to Production at go-live (Project → Settings → Domains → admin.vexaos.io → Production).

Sign in with your VexaOs (Supabase) account. Access is an allowlist in the database (`store.admins`); the
email must be confirmed. `darius.henry@gmail.com` is the owner; owners add and remove people in Settings.

- **Products:** name, web address, summary, description, category, photos (upload, reorder, describe),
  price and compare-at price, stock or made-to-order with lead time, options and variants, status
  (draft / active / archived), search-engine title and description with a preview, translations, and a live
  preview of what a shopper sees. A product cannot be made active without a price.
- **Orders:** status, carrier, tracking number and link, private notes. Test orders are labelled.
- **Overview:** revenue and order counts for today, 7 days, 30 days and all time, best sellers, orders to
  ship. Test payments are shown apart from real ones.

Changing an order's status does not email the customer (Stripe sends the receipt).

## Not included yet

Shipping rates and tax (Checkout currently charges the item prices only), customer emails beyond Stripe's
receipt, discount codes, and automatic restocking on refund.

## Code map

`lib/store/` (config, cart rules, checkout session, webhook handling, JSON-LD, strings, admin form rules),
`app/api/store/` (checkout, webhook, revalidate, status), `app/[locale]/store/` (storefront),
`components/store/`, `components/store-admin/`, `app/admin/store/`. Database: migration
`20261017090000_store.sql` in the platform repository (with rollback and tests). Tests: `npm test`.
