import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
    <section id={id} className={`relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25">
      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
      <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-sky-200">
        {children}
      </span>
    </div>
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
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-12 sm:mb-14`}>
      {eyebrow && (
        <div className="mb-5">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.1] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg text-gray-400 leading-relaxed text-balance">{subtitle}</p>
      )}
    </div>
  );
}

/** Page hero shared by every interior marketing page. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-32 sm:pt-36 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-40 pointer-events-none" />
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[46rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(14,165,233,0.16), rgba(14,165,233,0))',
        }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        {eyebrow && (
          <div className="mb-6">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}

export function PrimaryButton({
  href,
  children,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-400 hover:to-blue-500 transition-colors ${className}`;
  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-semibold hover:bg-white/[0.08] transition-colors ${className}`;
  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** "Powered by VexaOS" product badge. */
export function PoweredByBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-medium tracking-wide text-gray-400 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-sky-300 to-blue-600" />
      Powered by <span className="text-gray-200">VexaOS</span>
    </span>
  );
}

/** Closing call-to-action band reused at the bottom of most pages. */
export function CTABand({
  title,
  subtitle,
  primary = { label: 'Book a demo', href: '/demo' },
  secondary = { label: 'Contact sales', href: '/contact' },
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section className="border-t border-white/10">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/[0.09] via-blue-600/[0.05] to-transparent px-6 py-14 sm:px-12 sm:py-16 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(60% 80% at 50% 0%, rgba(56,189,248,0.14), rgba(0,0,0,0))',
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-gray-400 text-lg leading-relaxed text-balance">{subtitle}</p>
          )}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href={primary.href} className="w-full sm:w-auto">
              {primary.label}
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href={secondary.href} className="w-full sm:w-auto">
              {secondary.label}
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
