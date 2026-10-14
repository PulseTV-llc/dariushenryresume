import type { Locale } from '@/lib/i18n/config';
import { en, type MobileGatewayStrings } from './i18n/en';
import { th } from './i18n/th';
import { vi } from './i18n/vi';
import { id } from './i18n/id';
import { fil } from './i18n/fil';

export type { MobileGatewayStrings };
/** Every language's copy for /products/mobile-gateway. English is the source; the others are machine drafts. */
export const MOBILE_GATEWAY_STRINGS: Record<Locale, MobileGatewayStrings> = { en, th, vi, id, fil };
export const mobileGatewayStrings = (locale: Locale): MobileGatewayStrings => MOBILE_GATEWAY_STRINGS[locale] ?? en;
export const MOBILE_GATEWAY_PATH = '/products/mobile-gateway';
