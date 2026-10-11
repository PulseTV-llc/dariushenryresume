import { Fragment, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Check, Radio, Router, Truck, CloudCog, MonitorSmartphone, Thermometer, DoorOpen, Activity, Plug, Snowflake,
  Warehouse, Factory, Building2, HeartPulse, UtensilsCrossed, Wind, Droplets, Zap, Tag, ShieldAlert, Gauge, Cable,
  Bluetooth, Wifi, type LucideIcon,
} from 'lucide-react';
import TrackedLink from './TrackedLink';
import type { EventProps, MarketingEvent } from '@/lib/analytics';
import type { IconName, Status } from '@/lib/site';

const ICONS: Record<IconName, LucideIcon> = {
  sensors: Radio, gateway: Router, mobile: Truck, cloud: CloudCog, apps: MonitorSmartphone, thermometer: Thermometer,
  door: DoorOpen, vibration: Activity, plug: Plug, food: Snowflake, warehouse: Warehouse, factory: Factory,
  building: Building2, health: HeartPulse, restaurant: UtensilsCrossed, environment: Wind, water: Droplets,
  energy: Zap, assets: Tag, safety: ShieldAlert, process: Gauge, wired: Cable, bluetooth: Bluetooth, wifi: Wifi,
};

/** Render the two inline markers used in content: **bold** and [[accent]]. */
export function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('[[')) return <span key={i} className="gradient-text">{part.slice(2, -2)}</span>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Icon({ name, className = 'w-5 h-5' }: { name: IconName; className?: string }) {
  const C = ICONS[name];
  return <C className={className} aria-hidden="true" />;
}

/** Icon in the soft blue tile the VexaOs apps use. */
export function IconTile({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 ${className}`}>
      <Icon name={name} />
    </span>
  );
}

const STATUS_TONE: Record<Status, string> = {
  available: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  development: 'bg-amber-50 text-amber-800 ring-amber-200',
  soon: 'bg-amber-50 text-amber-800 ring-amber-200',
};

/** `labels` is content.common.status. "Available" is only shown when asked for. */
export function StatusBadge({ status, labels, showAvailable = false }: { status: Status; labels: Record<Status, string>; showAvailable?: boolean }) {
  if (status === 'available' && !showAvailable) return null;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${STATUS_TONE[status]}`}>
      {labels[status]}
    </span>
  );
}

export function Section({ id, children, tinted = false, className = '' }: { id?: string; children: ReactNode; tinted?: boolean; className?: string }) {
  return (
    <section id={id} className={`relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 ${tinted ? 'bg-white/60' : ''} ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 ring-1 ring-blue-100">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title?: string; subtitle?: string }) {
  if (!eyebrow && !title) return null;
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
      {eyebrow && (
        <div className="mb-4">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      {title && <h2 className="text-balance text-3xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">{rich(title)}</h2>}
      {subtitle && <p className="mt-4 text-balance text-lg leading-relaxed text-slate-600">{rich(subtitle)}</p>}
    </div>
  );
}

const primaryCls =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-800 hover:to-blue-600';
const secondaryCls =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-white';

export function Button({
  href, children, variant = 'primary', className = '', event, eventProps,
}: {
  href: string; children: ReactNode; variant?: 'primary' | 'secondary'; className?: string; event?: MarketingEvent; eventProps?: EventProps;
}) {
  const cls = `${variant === 'primary' ? primaryCls : secondaryCls} ${className}`;
  return event ? (
    <TrackedLink href={href} className={cls} event={event} eventProps={eventProps}>{children}</TrackedLink>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-3xl p-6 sm:p-7 ${className}`}>{children}</div>;
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
          </span>
          <span>{rich(item)}</span>
        </li>
      ))}
    </ul>
  );
}

/** A plain note for limits and things that are not available yet. */
export function HonestNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm leading-relaxed text-amber-950">
      <p className="mb-1 font-semibold">{title}</p>
      {children}
    </aside>
  );
}

/** A real product screenshot in a glass frame, with a caption. */
export function Shot({
  src, width, height, alt, caption, priority = false, sizes = '(min-width: 1024px) 60vw, 100vw', className = '', phone = false,
}: {
  src: string; width: number; height: number; alt: string; caption?: string; priority?: boolean; sizes?: string; className?: string; phone?: boolean;
}) {
  return (
    <figure className={`${phone ? 'mx-auto max-w-sm' : ''} ${width < 500 ? 'mx-auto max-w-xs' : ''} ${className}`}>
      <div className={`glass overflow-hidden p-2 ${phone ? 'rounded-[2.25rem]' : 'rounded-3xl'}`}>
        <Image src={src} width={width} height={height} alt={alt} priority={priority} sizes={sizes} className={`h-auto w-full ${phone ? 'rounded-[1.75rem]' : 'rounded-2xl'}`} />
      </div>
      {caption && <figcaption className="mt-3 text-center text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
