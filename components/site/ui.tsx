import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  Radio,
  Router,
  Truck,
  CloudCog,
  MonitorSmartphone,
  Thermometer,
  DoorOpen,
  Activity,
  Plug,
  Snowflake,
  Warehouse,
  Factory,
  Building2,
  HeartPulse,
  UtensilsCrossed,
  Wind,
  Droplets,
  Zap,
  Tag,
  ShieldAlert,
  Gauge,
  Cable,
  Bluetooth,
  type LucideIcon,
} from 'lucide-react';
import TrackedLink from './TrackedLink';
import type { EventProps, MarketingEvent } from '@/lib/analytics';
import { STATUS_LABEL, type IconName, type Status } from '@/lib/site';

const ICONS: Record<IconName, LucideIcon> = {
  sensors: Radio,
  gateway: Router,
  mobile: Truck,
  cloud: CloudCog,
  apps: MonitorSmartphone,
  thermometer: Thermometer,
  door: DoorOpen,
  vibration: Activity,
  plug: Plug,
  food: Snowflake,
  warehouse: Warehouse,
  factory: Factory,
  building: Building2,
  health: HeartPulse,
  restaurant: UtensilsCrossed,
  environment: Wind,
  water: Droplets,
  energy: Zap,
  assets: Tag,
  safety: ShieldAlert,
  process: Gauge,
  wired: Cable,
  bluetooth: Bluetooth,
};

export function Icon({ name, className = 'w-5 h-5' }: { name: IconName; className?: string }) {
  const C = ICONS[name];
  return <C className={className} aria-hidden="true" />;
}

/** Icon in the soft blue tile the VexaOS apps use. */
export function IconTile({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 ${className}`}
    >
      <Icon name={name} />
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  if (status === 'available') return null;
  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
      {STATUS_LABEL[status]}
    </span>
  );
}

/** Consistent section wrapper used across pages. */
export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 ring-1 ring-blue-100">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} mb-10 max-w-3xl sm:mb-12`}>
      {eyebrow && (
        <div className="mb-4">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="text-balance text-3xl font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-balance text-lg leading-relaxed text-slate-600">{subtitle}</p>}
    </div>
  );
}

/** Page hero shared by every interior page. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  badge,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-32 sm:px-6 sm:pb-16 sm:pt-40 lg:px-8">
      <div className="page-wash pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl text-center">
        {(eyebrow || badge) && (
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {badge}
          </div>
        )}
        <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-slate-600">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

const primaryCls =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-800 hover:to-blue-600';
const secondaryCls =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-white';

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  event?: MarketingEvent;
  eventProps?: EventProps;
}

export function PrimaryButton({ href, children, className = '', event, eventProps }: ButtonProps) {
  const cls = `${primaryCls} ${className}`;
  return event ? (
    <TrackedLink href={href} className={cls} event={event} eventProps={eventProps}>
      {children}
    </TrackedLink>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children, className = '', event, eventProps }: ButtonProps) {
  const cls = `${secondaryCls} ${className}`;
  return event ? (
    <TrackedLink href={href} className={cls} event={event} eventProps={eventProps}>
      {children}
    </TrackedLink>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-3xl p-6 sm:p-7 ${className}`}>{children}</div>;
}

/** Title + body card, optionally with an icon and a status badge. */
export function FeatureCard({
  icon,
  title,
  body,
  status,
}: {
  icon?: IconName;
  title: string;
  body: ReactNode;
  status?: Status;
}) {
  return (
    <GlassCard className="h-full">
      {icon && <IconTile name={icon} className="mb-4" />}
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {status && <StatusBadge status={status} />}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
    </GlassCard>
  );
}

export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A plain note for limits and things that are not available yet. */
export function HonestNote({ title = 'Worth knowing', children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm leading-relaxed text-amber-950">
      <p className="mb-1 font-semibold">{title}</p>
      {children}
    </aside>
  );
}

/** A real product screenshot in a glass frame, with a caption. */
export function Shot({
  src,
  width,
  height,
  alt,
  caption,
  priority = false,
  sizes = '(min-width: 1024px) 60vw, 100vw',
  className = '',
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="glass overflow-hidden rounded-3xl p-2">
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full rounded-2xl"
        />
      </div>
      {caption && <figcaption className="mt-3 text-center text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

/** Text on one side, visual on the other. */
export function Split({
  eyebrow,
  title,
  body,
  children,
  visual,
  flip = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
  visual: ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className={flip ? 'lg:order-2' : ''}>
        {eyebrow && (
          <div className="mb-4">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h2 className="text-balance text-3xl font-bold leading-[1.15] tracking-tight text-slate-900">{title}</h2>
        {body && <p className="mt-4 text-lg leading-relaxed text-slate-600">{body}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
      <div className={flip ? 'lg:order-1' : ''}>{visual}</div>
    </div>
  );
}

/** Closing call to action used at the bottom of every page. */
export function CTABand({
  title = 'See it on your own equipment.',
  body = 'Tell us what you need to watch and where. We will show you the platform and be straight about what it can and cannot do today.',
  placement,
}: {
  title?: string;
  body?: string;
  placement: string;
}) {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-700 to-sky-500 px-6 py-14 text-center shadow-xl shadow-blue-900/20 sm:px-12">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-blue-50">{body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackedLink
            href="/contact"
            event="final_cta_click"
            eventProps={{ placement }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 sm:w-auto"
          >
            Book a demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedLink>
          <Link
            href="/platform"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
          >
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}
