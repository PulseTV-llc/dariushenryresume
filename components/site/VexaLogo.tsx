'use client';

import VexaMark from './VexaMark';

/**
 * VexaOS logo lockup: atom mark + "VexaOS" wordmark, with an optional
 * "CUSTOM BUSINESS SYSTEMS" tagline. Used in the nav (no tagline) and
 * elsewhere. The official raster lockup (public/vexaos-logo.png) is used in
 * the footer / OG image; this vector lockup keeps the nav crisp at any size.
 */
export default function VexaLogo({
  markSize = 30,
  showTagline = false,
  className = '',
}: {
  markSize?: number;
  showTagline?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <VexaMark size={markSize} />
      <span className="flex flex-col leading-none">
        <span
          className="font-bold text-white tracking-tight"
          style={{ fontSize: markSize * 0.62 }}
        >
          Vexa<span className="text-sky-300">OS</span>
        </span>
        {showTagline && (
          <span
            className="uppercase text-cyan-300/90 font-medium tracking-[0.2em] mt-1.5"
            style={{ fontSize: Math.max(9.5, markSize * 0.28) }}
          >
            Custom Business Systems
          </span>
        )}
      </span>
    </span>
  );
}
