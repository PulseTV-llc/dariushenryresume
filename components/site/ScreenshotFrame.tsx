import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import type { Screenshot, HardwarePhoto } from '@/lib/screens';

/**
 * Renders a product screenshot inside brand chrome. `browser` draws a window
 * bar (for control-center captures); `device` draws a bezel (for board and
 * kiosk captures).
 */
export default function ScreenshotFrame({
  shot,
  priority = false,
  showCaption = true,
  className = '',
  sizes = '(min-width: 1024px) 60vw, 100vw',
}: {
  shot: Screenshot;
  priority?: boolean;
  showCaption?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/12 bg-[#070b14] shadow-2xl shadow-black/50 ${
          shot.frame === 'device' ? 'p-2 sm:p-2.5' : ''
        }`}
      >
        {shot.frame === 'browser' && (
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.04] border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="ml-3 h-4 flex-1 max-w-[14rem] rounded bg-white/[0.05]" />
          </div>
        )}
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          priority={priority}
          sizes={sizes}
          className={`w-full h-auto ${shot.frame === 'device' ? 'rounded-xl' : ''}`}
        />
      </div>
      {showCaption && (
        <figcaption className="mt-4 text-sm text-gray-500 leading-relaxed text-center max-w-2xl mx-auto">
          {shot.caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Reserved slot for a product screenshot that has been commissioned but not
 * delivered. Renders in the same browser chrome as a real capture so the layout
 * does not shift when the image lands.
 */
export function PendingScreenshotSlot({
  label,
  hint,
}: {
  label: string;
  hint: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02]">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.03] border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="ml-3 h-4 flex-1 max-w-[14rem] rounded bg-white/[0.04]" />
      </div>
      <div
        className="flex flex-col items-center justify-center px-6 text-center"
        style={{ aspectRatio: '16 / 10' }}
      >
        <span className="inline-flex w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 items-center justify-center">
          <ImageIcon className="w-5 h-5 text-gray-600" />
        </span>
        <p className="mt-4 text-sm font-medium text-gray-400">{label}</p>
        <p className="mt-1 text-xs text-gray-600 leading-relaxed max-w-sm">{hint}</p>
        <span className="mt-3 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
          Capture pending
        </span>
      </div>
    </div>
  );
}

/**
 * A real TouchBoard product photo. Framed like the screenshot cards so the
 * hardware section reads as one set, with the form factor and the mode the
 * board is running captioned beneath.
 */
export function HardwarePhotoCard({
  photo,
  sizes = '(min-width: 1024px) 33vw, 100vw',
}: {
  photo: HardwarePhoto;
  sizes?: string;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#070b14] shadow-xl shadow-black/40">
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          sizes={sizes}
          loading="lazy"
          className="w-full h-auto"
        />
      </div>
      <figcaption className="mt-3">
        <p className="text-sm font-semibold text-white">{photo.label}</p>
        <p className="mt-0.5 text-xs text-gray-500">Running {photo.running}</p>
      </figcaption>
    </figure>
  );
}
