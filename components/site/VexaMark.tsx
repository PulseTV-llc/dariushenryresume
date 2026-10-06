import { useId } from 'react';

/**
 * The official VexaOs orbital mark: two crossed elliptical orbits around a
 * bright core, with four dots on a faint ring. Inline SVG so it stays crisp at
 * any size. Below 40px (or with `simple`) the ring, dots and glow are dropped
 * so it stays legible. Keep in sync with brand/build-icons.mjs, which renders
 * the favicon and app icons from the same geometry.
 */
export default function VexaMark({
  size = 32,
  simple,
  className = '',
  title = 'VexaOs',
}: {
  size?: number;
  simple?: boolean;
  className?: string;
  title?: string;
}) {
  const id = useId().replace(/:/g, '');
  const isSimple = simple ?? size < 40;
  const w = isSimple ? 7.5 : 5.2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d4ed8" />
          <stop offset=".45" stopColor="#2f8bff" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7dd3fc" />
          <stop offset=".5" stopColor="#22a7f5" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <radialGradient id={`${id}-c`} cx=".42" cy=".38" r=".7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".35" stopColor="#8fdcff" />
          <stop offset="1" stopColor="#1d6bf0" />
        </radialGradient>
        {!isSimple && (
          <filter id={`${id}-g`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        )}
      </defs>

      {!isSimple && (
        <>
          <circle cx="50" cy="50" r="45.5" fill="none" stroke="#38bdf8" strokeOpacity=".32" strokeWidth=".6" />
          <path d="M50 4.5V95.5M4.5 50H95.5" stroke="#38bdf8" strokeOpacity=".28" strokeWidth=".5" strokeDasharray=".6 2.2" />
          <g fill="none" strokeWidth={w} opacity=".55" filter={`url(#${id}-g)`}>
            <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(35 50 50)" stroke="#2f8bff" />
            <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(-35 50 50)" stroke="#38bdf8" />
          </g>
        </>
      )}

      {/* two crossed orbits */}
      <g fill="none" strokeWidth={w}>
        <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(35 50 50)" stroke={`url(#${id}-a)`} />
        <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(-35 50 50)" stroke={`url(#${id}-b)`} />
      </g>

      {/* core */}
      {!isSimple && <circle cx="50" cy="50" r="13" fill="#38bdf8" opacity=".45" filter={`url(#${id}-g)`} />}
      <circle cx="50" cy="50" r={isSimple ? 10 : 9} fill={`url(#${id}-c)`} />

      {!isSimple && (
        <g fill="#7dd3fc">
          <circle cx="50" cy="4.5" r="2.1" />
          <circle cx="50" cy="95.5" r="2.1" />
          <circle cx="4.5" cy="50" r="2.1" />
          <circle cx="95.5" cy="50" r="2.1" />
        </g>
      )}
    </svg>
  );
}
