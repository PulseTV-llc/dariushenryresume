/** Waitlist rules shared by the form, the API route and the admin export. Pure. */
export const EMAIL = /^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/;
export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** A trimmed, lower-cased address, or null when it is not one. The database checks again. */
export function cleanEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const v = value.trim().toLowerCase();
  return v.length <= 254 && EMAIL.test(v) && !v.includes('..') ? v : null;
}

export interface WaitlistEntry { email: string; locale: string | null; created_at: string }
const cell = (v: unknown) => { const s = v == null ? '' : String(v); return /[",\n\r]/.test(s) || /^[=+\-@]/.test(s) ? `"${s.replace(/"/g, '""').replace(/^([=+\-@])/, "'$1")}"` : s; };
/** Emails of one product for a spreadsheet. Values that a spreadsheet could run as a formula are defused. */
export function waitlistCsv(product: string, entries: WaitlistEntry[]): string {
  return [['Product', 'Email', 'Language', 'Signed up (UTC)'], ...entries.map((e) => [product, e.email, e.locale ?? '', e.created_at.replace('T', ' ').slice(0, 19)])]
    .map((row) => row.map(cell).join(',')).join('\r\n') + '\r\n';
}
export const waitlistCsvName = (slug: string, day = new Date().toISOString().slice(0, 10)) => `vexaos-waitlist-${slug}-${day}.csv`;
