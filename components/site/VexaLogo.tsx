/**
 * VexaOS logo lockup: the "V" mark used by the VexaOS apps plus the wordmark.
 * Inline SVG so it stays crisp at any size and needs no image request.
 */
export function VexaV({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="vx-v-light" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>
      <path d="M9 10 L22 38" stroke="#1d4ed8" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M22 38 L39 10" stroke="url(#vx-v-light)" strokeWidth="9" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function VexaLogo({
  size = 28,
  tone = 'dark',
  className = '',
}: {
  size?: number;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <VexaV size={size} />
      <span
        className={`font-bold tracking-tight ${tone === 'dark' ? 'text-slate-900' : 'text-white'}`}
        style={{ fontSize: size * 0.72 }}
      >
        Vexa<span className={tone === 'dark' ? 'text-blue-600' : 'text-sky-300'}>OS</span>
      </span>
    </span>
  );
}
