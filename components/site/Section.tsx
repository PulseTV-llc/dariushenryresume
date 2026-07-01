import { ReactNode } from 'react';

/** Consistent section wrapper + eyebrow/heading styling used across pages. */
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
    <section id={id} className={`relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
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
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-14`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-200">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg text-gray-400 leading-relaxed text-balance">{subtitle}</p>
      )}
    </div>
  );
}
