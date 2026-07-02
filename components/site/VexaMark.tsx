import { useId } from 'react';

/**
 * VexaOS atom-orbit mark — an inline SVG recreation of the brand mark
 * (two crossed orbits + glowing nucleus) in the electric-blue → cyan gradient.
 * Crisp at any size and theme-matched. Use alongside the "VexaOS" wordmark.
 */
export default function VexaMark({
  size = 32,
  className = '',
  title = 'VexaOS',
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  const id = useId().replace(/:/g, '');
  const grad = `vx-grad-${id}`;
  const glow = `vx-glow-${id}`;
  const core = `vx-core-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <radialGradient id={core} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#2563eb" />
        </radialGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* faint outer ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={`url(#${grad})`} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" />

      <g filter={`url(#${glow})`} fill="none" stroke={`url(#${grad})`} strokeWidth="6" strokeLinecap="round">
        {/* two crossed orbits */}
        <ellipse cx="50" cy="50" rx="40" ry="17" transform="rotate(35 50 50)" />
        <ellipse cx="50" cy="50" rx="40" ry="17" transform="rotate(-35 50 50)" />
      </g>

      {/* orbit dots */}
      <g fill="#67e8f9">
        <circle cx="50" cy="9" r="2.4" />
        <circle cx="50" cy="91" r="2.4" />
        <circle cx="12" cy="50" r="2.4" />
        <circle cx="88" cy="50" r="2.4" />
      </g>

      {/* nucleus */}
      <circle cx="50" cy="50" r="9" fill={`url(#${core})`} filter={`url(#${glow})`} />
    </svg>
  );
}
