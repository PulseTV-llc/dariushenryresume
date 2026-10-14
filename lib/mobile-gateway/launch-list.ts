/**
 * The Mobile Gateway launch list: the form's rules, shared by the form (client), the API route (server) and the
 * admin export. Pure: no I/O here. The database (public.marketing_launch_join) checks everything again.
 */
import { cleanEmail } from '@/lib/store/waitlist';

/** Bump when the consent sentence changes meaningfully; stored with every sign-up. */
export const CONSENT_VERSION = '2026-10-14';
export const PRODUCT = 'mobile-gateway';

/** Order matches the labels in strings early.form.industries. Values match the enum marketing.launch_industry. */
export const INDUSTRY_KEYS = ['trucking_fleet', 'agriculture', 'cold_chain', 'healthcare_logistics', 'industrial_equipment', 'construction', 'utilities', 'other'] as const;
/** Order matches early.form.quantities. */
export const SIZE_KEYS = ['1-5', '6-25', '26-100', '101-500', '500+', 'unsure'] as const;
/** Order matches early.form.monitorOptions. */
export const MONITOR_KEYS = ['temperature', 'humidity', 'access', 'location', 'soil', 'water', 'vibration', 'energy', 'other'] as const;
export const REQUEST_TYPES = ['launch_list', 'consultation'] as const;

export type Industry = (typeof INDUSTRY_KEYS)[number];
export type Size = (typeof SIZE_KEYS)[number];
export type Monitor = (typeof MONITOR_KEYS)[number];
export type RequestType = (typeof REQUEST_TYPES)[number];

export const LIMITS = { name: 120, company: 160, useCase: 300, message: 2000 } as const;

/** ISO 3166-1 alpha-2 codes offered in the Country list (names come from Intl.DisplayNames in the visitor's language). */
export const COUNTRY_CODES = (
  'AD AE AF AG AL AM AO AR AT AU AZ BA BB BD BE BF BG BH BI BJ BN BO BR BS BT BW BY BZ CA CD CF CG CH CI CL CM CN CO CR CU CV CY CZ ' +
  'DE DJ DK DM DO DZ EC EE EG ER ES ET FI FJ FM FR GA GB GD GE GH GM GN GQ GR GT GW GY HK HN HR HT HU ID IE IL IN IQ IR IS IT JM JO JP ' +
  'KE KG KH KI KM KN KR KW KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MG MH MK ML MM MN MO MR MT MU MV MW MX MY MZ NA NE NG NI NL ' +
  'NO NP NR NZ OM PA PE PG PH PK PL PR PS PT PW PY QA RO RS RU RW SA SB SC SD SE SG SI SK SL SM SN SO SR SS ST SV SY SZ TD TG TH TJ TL ' +
  'TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VN VU WS YE ZA ZM ZW'
).split(' ');

export interface LaunchForm {
  full_name: string;
  email: string;
  company: string;
  industry: Industry;
  use_case: string;
  country: string | null;
  deployment_size: Size | null;
  monitor: Monitor[];
  message: string;
  request_type: RequestType;
  consent: true;
}
export type FieldError = 'name' | 'email' | 'company' | 'industry' | 'consent' | 'tooLong';
export type LaunchErrors = Partial<Record<'full_name' | 'email' | 'company' | 'industry' | 'consent' | 'use_case' | 'message' | 'form', FieldError>>;

const text = (v: unknown) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim() : '');
const block = (v: unknown) => (typeof v === 'string' ? v.replace(/\r\n?/g, '\n').trim() : '');
const one = <T extends string>(v: unknown, list: readonly T[]): T | null => (typeof v === 'string' && (list as readonly string[]).includes(v) ? (v as T) : null);

/** Validate and clean what a visitor sent. Same rules on the client (for messages) and the server (for safety). */
export function validateLaunchForm(input: Record<string, unknown>): { ok: true; value: LaunchForm } | { ok: false; errors: LaunchErrors } {
  const errors: LaunchErrors = {};
  const full_name = text(input.full_name);
  const email = cleanEmail(input.email);
  const company = text(input.company);
  const industry = one(input.industry, INDUSTRY_KEYS);
  const use_case = text(input.use_case);
  const message = block(input.message);
  if (!full_name) errors.full_name = 'name'; else if (full_name.length > LIMITS.name) errors.full_name = 'tooLong';
  if (!email) errors.email = 'email';
  if (!company) errors.company = 'company'; else if (company.length > LIMITS.company) errors.company = 'tooLong';
  if (!industry) errors.industry = 'industry';
  if (use_case.length > LIMITS.useCase) errors.use_case = 'tooLong';
  if (message.length > LIMITS.message) errors.message = 'tooLong';
  if (input.consent !== true) errors.consent = 'consent';
  if (Object.keys(errors).length || !email || !industry) return { ok: false, errors };
  const country = typeof input.country === 'string' && COUNTRY_CODES.includes(input.country.toUpperCase()) ? input.country.toUpperCase() : null;
  const monitor = Array.isArray(input.monitor) ? Array.from(new Set(input.monitor.filter((m): m is Monitor => (MONITOR_KEYS as readonly unknown[]).includes(m)))) : [];
  return {
    ok: true,
    value: {
      full_name, email, company, industry, use_case, message, country, monitor,
      deployment_size: one(input.deployment_size, SIZE_KEYS),
      request_type: one(input.request_type, REQUEST_TYPES) ?? 'launch_list',
      consent: true,
    },
  };
}

/** The unsubscribe page, with the token in the fragment (never sent to a server log by the browser). */
export const unsubscribePath = (token: string) => `/products/mobile-gateway/unsubscribe#t=${token}`;
/** Tokens are 32 random bytes in base64url. */
export const TOKEN = /^[A-Za-z0-9_-]{43}$/;

export interface LaunchEntry {
  id: string; product: string; email: string; full_name: string; company: string | null; industry: Industry; use_case: string | null;
  monitor: string[]; country: string | null; deployment_size: string | null; message: string | null; request_type: RequestType;
  consent_version: string; consented_at: string; source: string | null; locale: string | null; status: 'subscribed' | 'unsubscribed';
  unsubscribed_at: string | null; submissions: number; created_at: string; updated_at: string;
}

const cell = (v: unknown) => {
  const s = v == null ? '' : Array.isArray(v) ? v.join('; ') : String(v);
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;   // a spreadsheet must never run a value as a formula
  return /[",\n\r]/.test(safe) || safe !== s ? `"${safe.replace(/"/g, '""')}"` : safe;
};
const utc = (iso: string | null) => (iso ? iso.replace('T', ' ').slice(0, 19) : '');
/** All sign-ups for a spreadsheet (UTF-8 with BOM so Excel reads non-Latin names). */
export function launchListCsv(entries: LaunchEntry[]): string {
  const head = ['Signed up (UTC)', 'Updated (UTC)', 'Status', 'Request', 'Full name', 'Email', 'Company', 'Industry', 'Primary use case', 'Monitor',
    'Country', 'Deployment size', 'Message', 'Language', 'Source', 'Consent version', 'Consented (UTC)', 'Unsubscribed (UTC)', 'Submissions'];
  const rows = entries.map((e) => [utc(e.created_at), utc(e.updated_at), e.status, e.request_type, e.full_name, e.email, e.company, e.industry, e.use_case, e.monitor,
    e.country, e.deployment_size, e.message, e.locale, e.source, e.consent_version, utc(e.consented_at), utc(e.unsubscribed_at), e.submissions]);
  return '﻿' + [head, ...rows].map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';
}
export const launchListCsvName = (day = new Date().toISOString().slice(0, 10)) => `vexaos-mobile-gateway-launch-list-${day}.csv`;
