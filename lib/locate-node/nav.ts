import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { getProduct } from '@/lib/store/catalog';
import type { StoreProduct } from '@/lib/store/types';
import { LOCATE_NODE_PATH, LOCATE_NODE_SLUG } from './strings';

/**
 * The Locate Node's entry in the site's navigation: the Products menu (desktop and mobile), the footer and the
 * card on /products. The name is the same in every language, so renaming the product here is one string.
 */
export const LOCATE_NODE_NAV_LABEL = 'Locate Node';

export const LOCATE_NODE_NAV: Record<Locale, { role: string; description: string; new: string; soon: string }> = {
  en: { role: 'Bluetooth gateway', description: 'A compact Bluetooth gateway designed to bring sensors and tagged equipment into one picture.', new: 'New', soon: 'Coming soon' },
  th: { role: 'เกตเวย์บลูทูธ', description: 'เกตเวย์บลูทูธขนาดกะทัดรัด ออกแบบมาเพื่อรวมเซ็นเซอร์และอุปกรณ์ที่ติดแท็กไว้ในภาพเดียว', new: 'ใหม่', soon: 'เร็ว ๆ นี้' },
  vi: { role: 'Gateway Bluetooth', description: 'Gateway Bluetooth nhỏ gọn, được thiết kế để đưa cảm biến và thiết bị gắn thẻ vào cùng một bức tranh.', new: 'Mới', soon: 'Sắp ra mắt' },
  id: { role: 'Gateway Bluetooth', description: 'Gateway Bluetooth ringkas yang dirancang untuk menyatukan sensor dan peralatan bertag dalam satu gambaran.', new: 'Baru', soon: 'Segera hadir' },
  fil: { role: 'Bluetooth gateway', description: 'Isang compact na Bluetooth gateway na idinisenyo para pagsamahin ang mga sensor at naka-tag na kagamitan sa iisang larawan.', new: 'Bago', soon: 'Malapit na' },
};

export interface LocateNodeLink { href: string; label: string; role: string; description: string; badge: string; soon: boolean }

/** The link for a product in a given state; null when the product is not public (the page does not exist then). */
export function locateNodeLinkFor(product: Pick<StoreProduct, 'status'> | null, locale: Locale): LocateNodeLink | null {
  if (!product) return null;
  const t = LOCATE_NODE_NAV[locale], soon = product.status === 'coming_soon';
  return { href: localePath(locale, LOCATE_NODE_PATH), label: LOCATE_NODE_NAV_LABEL, role: t.role, description: t.description, badge: soon ? t.soon : t.new, soon };
}

/** Follows the store: "Coming soon" while the product is announced, "New" once it is on sale, nothing if it is hidden. */
export const locateNodeLink = async (locale: Locale) => locateNodeLinkFor(await getProduct(LOCATE_NODE_SLUG), locale);
