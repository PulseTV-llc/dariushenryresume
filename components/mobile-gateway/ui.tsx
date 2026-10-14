import type { ReactNode } from 'react';
import type { StatusKey, Tech } from '@/lib/mobile-gateway/config';
import type { MobileGatewayStrings } from '@/lib/mobile-gateway/strings';

/** Small shared pieces of the Mobile Gateway page (server components). */

export function Title({ lines, as: Tag = 'h2', id, className = 'mg-h2' }: { lines: string | string[]; as?: 'h2' | 'h3'; id?: string; className?: string }) {
  const l = Array.isArray(lines) ? lines : [lines];
  return (
    <Tag id={id} className={className}>
      {l.map((x, i) => <span key={i} className={`block ${i > 0 ? 'mg-second' : ''}`}>{x}</span>)}
    </Tag>
  );
}

export function Head({ eyebrow, title, sub, id, center = false, notice, children }: { eyebrow?: string; title: string | string[]; sub?: string; id: string; center?: boolean; notice?: string; children?: ReactNode }) {
  return (
    <header data-mg-reveal className={center ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}>
      {eyebrow && <p className="mg-eyebrow">{eyebrow}</p>}
      <div className="mt-4"><Title lines={title} id={id} /></div>
      {sub && <p className={`mg-lead mt-6 ${center ? 'mx-auto' : ''} max-w-2xl`}>{sub}</p>}
      {notice && <p className="mt-6"><span className="mg-notice">{notice}</span></p>}
      {children}
    </header>
  );
}

export const Pill = ({ s, t }: { s: StatusKey; t: MobileGatewayStrings }) => <span className="mg-pill" data-s={s}>{t.status[s]}</span>;

export function techName(t: MobileGatewayStrings, k: Tech) {
  return k === 'gnss' ? t.networks.gnss : t.networks.items[['ble', 'lorawan', 'wifi', 'lte'].indexOf(k)].tab;
}
export function TechList({ t, tech, label }: { t: MobileGatewayStrings; tech: Tech[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {tech.map((k) => <li key={k} className="mg-tech">{techName(t, k)}</li>)}
    </ul>
  );
}

export function Checks({ items, tone, className = '' }: { items: string[]; tone?: 'roadmap'; className?: string }) {
  return <ul className={`mg-checks space-y-2.5 ${className}`} data-tone={tone}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

export const Section = ({ id, spy, label, className = '', children }: { id?: string; spy?: string; label: string; className?: string; children: ReactNode }) => (
  <section id={id} data-mg-spy={spy} aria-labelledby={label} className={`px-5 py-24 sm:px-8 sm:py-32 ${className}`}>
    <div className="mx-auto max-w-[76rem]">{children}</div>
  </section>
);
