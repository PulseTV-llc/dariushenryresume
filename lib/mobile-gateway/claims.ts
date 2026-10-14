/**
 * Claims the Mobile Gateway page must never make (see the honesty rules in ./i18n/en.ts). Used by claims.test.ts
 * to scan every string of the page in every language, and the page's component sources.
 *
 * Some words are fine when negated ("Not yet certified", "not intended to imply unlimited coverage", "Not claimed"):
 * for those, a match is allowed when a negation appears shortly before it in the same sentence.
 */
interface Rule { name: string; re: RegExp; negatable?: boolean }

export const BANNED: Rule[] = [
  { name: 'first', re: /\bfirst\b/gi },
  // "Wi-Fi-only" / "Cellular-only" describe a device architecture, not a ranking
  { name: 'only', re: /(?<![-‑])\bonly\b(?![-‑])/gi },
  { name: 'best', re: /\bbest\b/gi },
  { name: 'fastest', re: /\bfastest\b/gi },
  { name: 'most accurate', re: /\bmost\s+accurate\b/gi },
  { name: 'most secure', re: /\bmost\s+secure\b/gi },
  { name: 'certified', re: /\b(?:un)?certified\b/gi, negatable: true },
  { name: 'IP rating', re: /\bIP[0-9xX]{2}\b/g },
  { name: 'MIL-STD', re: /\bMIL[-\s]?STD\b/gi },
  { name: 'battery duration', re: /\b(?:days?|weeks?|months?|years?)\s+of\s+(?:battery|runtime|run\s*time|operation|power)\b/gi },
  { name: 'multi-day', re: /\bmulti[-\s]?(?:day|week|month)\b/gi },
  { name: '5G', re: /\b5G\b/g },
  { name: 'unlimited', re: /\bunlimited\b/gi, negatable: true },
  { name: 'guaranteed', re: /\bguarantee(?:d|s)?\b/gi, negatable: true },
  { name: 'FDA', re: /\bFDA\b/g },
  { name: 'HIPAA compliant', re: /\bHIPAA[-\s]?compliant\b/gi },
  { name: 'Raspberry', re: /\bRaspberry\b/gi },
  { name: 'Waveshare', re: /\bWaveshare\b/gi },
];

/** A negation within the few words before the match, in the same sentence. */
const NEGATION = /\b(?:not|no|nor|never|without|isn't|aren't|is\s+not|are\s+not|not\s+yet|n't)\b[^.;:!?]{0,40}$/i;

export interface Violation { rule: string; match: string; text: string }

export function findClaims(text: string): Violation[] {
  const out: Violation[] = [];
  for (const rule of BANNED) {
    for (const m of text.matchAll(rule.re)) {
      const before = text.slice(Math.max(0, (m.index ?? 0) - 48), m.index);
      if (rule.negatable && NEGATION.test(before)) continue;
      out.push({ rule: rule.name, match: m[0], text });
    }
  }
  return out;
}

/** Every string inside a value (objects and arrays, recursively). */
export const allStrings = (v: unknown): string[] =>
  typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(allStrings) : v && typeof v === 'object' ? Object.values(v).flatMap(allStrings) : [];
