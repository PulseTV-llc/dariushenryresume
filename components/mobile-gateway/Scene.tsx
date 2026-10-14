import type { ImageSlot } from '@/lib/mobile-gateway/config';
import { IMAGES } from '@/lib/mobile-gateway/images';
import { SCENES, VB } from './scenes/art';
import Picture from './Picture';

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;
const CUT = IMAGES.cutout;
/** width of the magnified gateway in a callout, in viewBox units */
const CALLOUT_W = 270;

/**
 * One environment: an original illustration with the real gateway render composited on it, signal paths to its
 * sensors, short data labels (no values), and an "Illustrative" tag. When the slot has a photo, the photo is shown
 * instead (with its credit), so commissioned photography can replace an illustration by editing data only.
 */
export default function Scene({ slot, uid, alt, label, overlays = [], className = '', sizes = '(min-width: 1024px) 60vw, 100vw', concept, priority = false }: {
  slot: ImageSlot; uid: string; alt: string; label: string; overlays?: string[]; className?: string; sizes?: string; concept?: string; priority?: boolean;
}) {
  if (slot.photo && slot.photo.key in IMAGES) {
    return (
      <figure className={`mg-scene ${className}`}>
        <Picture image={slot.photo.key as keyof typeof IMAGES} alt={alt} sizes={sizes} fill imgStyle={{ objectPosition: slot.photo.position ?? '50% 50%' }} priority={priority} />
        <div className="mg-scene-shade" aria-hidden="true" />
        {(concept || slot.photo.credit) && <figcaption className="mg-tag mg-tag-warn">{concept ?? slot.photo.credit}</figcaption>}
        <Overlays items={overlays} />
      </figure>
    );
  }
  const spec = SCENES[slot.illustration];
  const { x, y } = spec.device;
  const co = spec.callout;
  // in a callout the real render is shown magnified; otherwise at its place in the scene
  const w = co ? CALLOUT_W : spec.device.w;
  const h = (w * CUT.height) / CUT.width;
  const cx = co?.x ?? x, cy = co?.y ?? y;
  // the leader runs from the mount point to the nearest edge of the callout
  const box = { l: cx - w / 2 - 14, r: cx + w / 2 + 14, t: cy - h / 2 - 14, b: cy + h / 2 + 14 };
  const lx = Math.min(Math.max(x, box.l), box.r), ly = Math.min(Math.max(y, box.t), box.b);
  return (
    <figure className={`mg-scene ${className}`} role="img" aria-label={alt}>
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
        {spec.draw(uid)}
        {/* links from the sensors to the gateway */}
        <g className="mg-links">
          {spec.sensors.map(([sx, sy], i) => (
            <g key={i} style={{ ['--i' as string]: i }}>
              <path d={`M${sx} ${sy} Q${(sx + x) / 2} ${Math.min(sy, y) - 60} ${x} ${y}`} className="mg-link" />
              <circle cx={sx} cy={sy} r="5" className="mg-node" />
              <circle cx={sx} cy={sy} r="5" className="mg-node-ping" />
            </g>
          ))}
        </g>
        {spec.rings && (
          <g className="mg-rings">
            {[0, 1, 2].map((i) => <ellipse key={i} cx={x} cy={y} rx={300} ry={80} className="mg-ring" style={{ ['--i' as string]: i }} />)}
          </g>
        )}
        {co ? (
          <g>
            <line x1={x} y1={y} x2={lx} y2={ly} stroke="#45B8FF" strokeOpacity="0.7" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <circle cx={x} cy={y} r="16" fill="#267DFF" opacity="0.25" />
            <circle cx={x} cy={y} r="6" fill="#F5F7FA" stroke="#267DFF" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <circle cx={x} cy={y} r="6" className="mg-node-ping" />
          </g>
        ) : (
          <>
            <ellipse cx={x} cy={y + h * 0.42} rx={w * 0.55} ry={h * 0.16} fill="#000" opacity="0.65" />
            <ellipse cx={x} cy={y + h * 0.42} rx={w * 0.9} ry={h * 0.32} fill="#267DFF" opacity="0.1" />
          </>
        )}
      </svg>
      <div className={co ? 'mg-scene-callout' : 'mg-scene-device'} style={{ left: pct(cx - w / 2 - (co ? 14 : 0), VB.w), top: pct(cy - h / 2 - (co ? 14 : 0), VB.h), width: pct(w + (co ? 28 : 0), VB.w) }}>
        <Picture image="cutout" alt="" sizes={`${Math.round((w / VB.w) * 60)}vw`} />
      </div>
      <figcaption className="mg-tag">{label}</figcaption>
      <Overlays items={overlays} />
    </figure>
  );
}

function Overlays({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mg-overlays" aria-hidden="true">
      {items.map((t, i) => <li key={t} className="mg-chip" style={{ ['--i' as string]: i }}><span className="mg-dot" />{t}</li>)}
    </ul>
  );
}
