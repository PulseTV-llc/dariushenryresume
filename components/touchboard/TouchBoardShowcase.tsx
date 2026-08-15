'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Poster-first video player.
 *
 * The clip is a 1080×1920 portrait hardware turntable with no audio track, so
 * it is deliberately NOT autoloaded: `preload="none"` plus a poster keeps the
 * 4.4MB off the initial page load, especially on mobile. The first tap swaps in
 * the real element and plays it muted, looping, with controls available.
 */
export default function TouchBoardVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    setStarted(true);
    // The element exists after this render; play on the next tick.
    requestAnimationFrame(() => {
      void videoRef.current?.play().catch(() => {
        /* Autoplay blocked — the native controls remain available. */
      });
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem]">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#070b14] shadow-2xl shadow-black/60 aspect-[9/16]">
        {started ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            muted
            loop
            playsInline
            preload="auto"
            aria-label={label}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={start}
            aria-label={`Play video: ${label}`}
            className="group absolute inset-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster}
              alt=""
              width={720}
              height={1280}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex w-16 h-16 rounded-full bg-white/90 items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
                <Play className="w-6 h-6 text-[#04070e] fill-[#04070e] ml-1" />
              </span>
            </span>
            <span className="absolute bottom-4 inset-x-0 text-center text-xs font-semibold text-white/90">
              Tap to play · 11s · no sound
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
