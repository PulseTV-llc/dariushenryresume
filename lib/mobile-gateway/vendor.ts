/**
 * Hardware vendor names for the Mobile Gateway's evaluation hardware.
 *
 * SHOW_VENDOR_NAMES is OFF by default: customer-facing copy never names the vendors of the evaluation boards,
 * and the specifications table shows the generic wording from the page strings instead
 * ("ESP32-S3 + LTE Cat-1 modem development platform", "Linux edge compute module", "Nano SIM (evaluation hardware)").
 * Set it to true (one line, then redeploy) to append the exact vendor names below to those rows in every language.
 * This file is the ONLY place these names may appear; lib/mobile-gateway/claims.test.ts enforces that.
 */
export const SHOW_VENDOR_NAMES = false;

export const VENDOR_NAMES = {
  /** Specs › Compute › Cellular platform */
  cellular: 'Waveshare ESP32-S3 + SIM7670G LTE Cat-1',
  /** Specs › Compute › LoRaWAN host */
  linux: 'Raspberry Pi / Raspberry Pi Compute Module',
  /** Specs › Cellular › SIM */
  sim: 'Waveshare ESP32-S3 + SIM7670G board',
} as const;
export type VendorKey = keyof typeof VENDOR_NAMES;

/** The value shown in a specification row: the generic wording, plus the vendor name only when the flag is on. */
export function withVendor(value: string, key: VendorKey | undefined, show: boolean = SHOW_VENDOR_NAMES): string {
  return show && key ? `${value} (${VENDOR_NAMES[key]})` : value;
}
