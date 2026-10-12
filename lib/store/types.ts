/** Shapes returned by the store's database functions (public.store_* in Supabase). */
export interface StoreImage { id: string; path: string; alt: string; width: number | null; height: number | null }
export interface StoreVariant {
  id: string; title: string; option_values: Record<string, string>; price_cents: number | null; available: boolean; max_quantity: number;
  /** true: the variant has its own price, so the product's bulk ranges do not apply to it */
  own_price?: boolean;
  // admin only
  sku?: string | null; inventory?: number; active?: boolean; own_price_cents?: number | null;
}
/** A bulk price: `unit_cents` each when min_qty..max_qty (null = and up) are bought. variant_id null = for the product's own price. */
export interface PriceTier { variant_id: string | null; min_qty: number; max_qty: number | null; unit_cents: number }
export interface StoreOption { name: string; values: string[] }
/** coming_soon: shown in the store, never sold */
export type ProductStatus = 'draft' | 'active' | 'archived' | 'coming_soon';
export type InventoryMode = 'tracked' | 'made_to_order';
export interface ProductText { name?: string; summary?: string; description?: string }
export interface StoreProduct {
  id: string; slug: string; name: string; summary: string; description: string; status: ProductStatus;
  category: { id: string; slug: string; name: string } | null;
  currency: string; price_cents: number | null; compare_at_cents: number | null; from_cents: number | null; price_varies: boolean;
  inventory_mode: InventoryMode; lead_time_days: number | null; available: boolean; max_quantity: number;
  options: StoreOption[]; seo_title: string | null; seo_description: string | null; translations: Record<string, ProductText>;
  updated_at: string; published_at: string | null; images: StoreImage[]; variants: StoreVariant[];
  /** bulk prices; the largest quantity of one item per order; whether to offer "contact us" beyond it */
  price_tiers?: PriceTier[]; order_limit?: number; bulk_contact?: boolean;
  /** coming soon: optional free text ("Spring 2027"), and whether the "Notify me" form is offered */
  expected_text?: string | null; notify_enabled?: boolean;
  // admin only
  inventory?: number; position?: number; category_id?: string | null; created_at?: string; sold?: number; waitlist?: number;
}
export interface StoreCategory { id: string; slug: string; name: string; position?: number }
export interface Catalog { products: StoreProduct[]; categories: StoreCategory[] }

export interface CartItem { productId: string; variantId: string | null; quantity: number }
export interface QuoteLine {
  product_id: string; variant_id: string | null; slug: string; name: string; variant_title: string | null; sku: string | null;
  unit_cents: number; quantity: number; image: string | null; made_to_order: boolean;
  /** the price for one; the bulk range that applied (null: none); the largest quantity allowed */
  base_cents?: number | null; tier_min?: number | null; tier_max?: number | null; max_quantity?: number;
}
export interface Quote { currency: string; subtotal_cents: number; lines: QuoteLine[] }

export type OrderStatus = 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export interface StoreOrder {
  id: string; number: number; status: OrderStatus; payment_status: string | null; email: string | null; name: string | null; phone: string | null;
  shipping: { name?: string; address?: Record<string, string | null> } | null; currency: string;
  subtotal_cents: number; shipping_cents: number; tax_cents: number; total_cents: number;
  tracking_carrier: string | null; tracking_number: string | null; tracking_url: string | null; notes: string | null;
  flags: Record<string, unknown>; livemode: boolean; locale: string | null; created_at: string; shipped_at: string | null;
  items: { name: string; variant_title: string | null; sku: string | null; unit_cents: number; quantity: number; base_cents?: number | null; tier_min?: number | null; tier_max?: number | null }[];
}
export interface SalesBlock {
  currency: string; mixed_currency: boolean; to_ship: number;
  today: { orders: number; revenue_cents: number }; last_7d: { orders: number; revenue_cents: number };
  last_30d: { orders: number; revenue_cents: number }; all_time: { orders: number; revenue_cents: number };
  top: { name: string; quantity: number; revenue_cents: number }[];
}
export type Sales = Partial<Record<'live' | 'test', SalesBlock>>;
