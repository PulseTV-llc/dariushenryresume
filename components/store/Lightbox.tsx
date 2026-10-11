'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { imageUrl } from '@/lib/store/config';
import type { StoreStrings } from '@/lib/store/strings';
import type { StoreImage } from '@/lib/store/types';
import { FIT, MAX_SCALE, TAP_SCALE, clampView, swipeDirection, wrap, zoomAt, type View } from '@/lib/store/zoom';

const BTN = 'inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 disabled:opacity-30 motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040916]';

/**
 * Full-screen photo viewer. The whole picture fitted to the screen; arrows, keys and swipe to change
 * photo; wheel, click, double-tap, pinch or the buttons to zoom, then drag to pan; Esc, the X or the dark
 * area to close. A modal dialog: focus stays inside, the page behind does not scroll, and focus returns
 * to the photo that opened it.
 */
export default function Lightbox({ images, name, t, index, onIndex, onClose }: {
  images: StoreImage[]; name: string; t: StoreStrings; index: number; onIndex: (i: number) => void; onClose: () => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [view, setView] = useState<View>(FIT);
  const [drag, setDrag] = useState(0);              // sideways follow of a swipe, in px
  const [moving, setMoving] = useState(false);      // true while fingers or the mouse are down: no easing
  const viewRef = useRef(view);
  viewRef.current = view;
  const gesture = useRef({ pointers: new Map<number, { x: number; y: number }>(), startX: 0, startY: 0, startView: FIT, moved: false, pinch: null as null | { dist: number; scale: number }, pinched: false, lastTap: 0 });
  const total = images.length;
  const image = images[index] ?? images[0];
  const alt = image.alt || t.photoOf.replace('{name}', name);
  const zoomed = view.scale > 1.001;

  const sizes = () => ({
    image: { width: img.current?.offsetWidth ?? 0, height: img.current?.offsetHeight ?? 0 },
    stage: { width: stage.current?.clientWidth ?? 0, height: stage.current?.clientHeight ?? 0 },
  });
  /** A screen position measured from the centre of the stage. */
  const fromCentre = (x: number, y: number) => {
    const r = stage.current!.getBoundingClientRect();
    return { x: x - (r.left + r.width / 2), y: y - (r.top + r.height / 2) };
  };
  const zoomTo = useCallback((scale: number, at?: { x: number; y: number }) => {
    const s = sizes();
    setView((v) => zoomAt(v, scale, at?.x ?? 0, at?.y ?? 0, s.image, s.stage));
  }, []);
  const go = useCallback((delta: number) => { if (total > 1) onIndex(wrap(index + delta, total)); }, [index, total, onIndex]);

  // a new photo starts fitted to the screen; its neighbours are fetched so the next step is instant
  useEffect(() => {
    setView(FIT);
    setDrag(0);
    for (const d of [1, -1]) if (total > 1) { const pre = new window.Image(); pre.src = imageUrl(images[wrap(index + d, total)].path); }
  }, [index, images, total]);

  // modal behaviour: lock the page, take focus, give it back, keep Tab inside, keys
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const before = { overflow: html.style.overflow, padding: html.style.paddingRight };
    html.style.paddingRight = `${window.innerWidth - html.clientWidth}px`;   // no jump when the scrollbar goes
    html.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    return () => { html.style.overflow = before.overflow; html.style.paddingRight = before.padding; opener?.focus?.(); };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === '+' || e.key === '=') zoomTo(viewRef.current.scale * 1.5);
      else if (e.key === '-' || e.key === '_') zoomTo(viewRef.current.scale / 1.5);
      else if (e.key === '0') setView(FIT);
      else if (e.key === 'Tab') {
        const items = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? []);
        if (items.length === 0) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!dialog.current?.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [go, onClose, zoomTo]);

  // the wheel zooms around the cursor (a non-passive listener, so the page never scrolls instead)
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomTo(viewRef.current.scale * Math.exp(-e.deltaY * 0.0022), fromCentre(e.clientX, e.clientY));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomTo]);

  const onDown = (e: React.PointerEvent) => {
    const g = gesture.current;
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* capture is a nicety; gestures work without it */ }
    g.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setMoving(true);
    if (g.pointers.size === 1) { g.startX = e.clientX; g.startY = e.clientY; g.startView = viewRef.current; g.moved = false; g.pinch = null; g.pinched = false; }
    if (g.pointers.size === 2) {
      const [a, b] = Array.from(g.pointers.values());
      g.pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, scale: viewRef.current.scale };
      g.moved = true;
      g.pinched = true;
      setDrag(0);
    }
  };
  const onMove = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g.pointers.has(e.pointerId)) return;
    g.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const s = sizes();
    if (g.pointers.size >= 2 && g.pinch) {
      const [a, b] = Array.from(g.pointers.values());
      const mid = fromCentre((a.x + b.x) / 2, (a.y + b.y) / 2);
      const target = g.pinch.scale * (Math.hypot(a.x - b.x, a.y - b.y) / g.pinch.dist);
      setView((v) => zoomAt(v, target, mid.x, mid.y, s.image, s.stage));
      return;
    }
    const dx = e.clientX - g.startX, dy = e.clientY - g.startY;
    if (Math.abs(dx) + Math.abs(dy) > 6) g.moved = true;
    if (g.startView.scale > 1.001) setView(clampView({ scale: g.startView.scale, x: g.startView.x + dx, y: g.startView.y + dy }, s.image, s.stage));
    else if (g.moved && total > 1 && !g.pinched) setDrag(dx);
  };
  const onUp = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g.pointers.has(e.pointerId)) return;
    const wasSingle = g.pointers.size === 1 && !g.pinch;
    g.pointers.delete(e.pointerId);
    if (g.pointers.size > 0) {
      // one finger of a pinch lifted: the other carries on as a drag from where it is now
      const [rest] = Array.from(g.pointers.values());
      g.startX = rest.x; g.startY = rest.y; g.startView = viewRef.current; g.pinch = null; g.moved = true;
      return;
    }
    setMoving(false);
    const dx = e.clientX - g.startX, dy = e.clientY - g.startY;
    g.pinch = null;
    if (!wasSingle) return;
    if (g.moved) {
      if (g.startView.scale <= 1.001 && !g.pinched) { const dir = swipeDirection(dx, dy); if (dir) go(dir); }   // a pinch never turns the page
      setDrag(0);
      return;
    }
    // a tap or click that did not move
    const onPicture = e.target === img.current;
    if (!onPicture) { onClose(); return; }                       // the dark area closes
    const at = fromCentre(e.clientX, e.clientY);
    const toggle = () => (viewRef.current.scale > 1.001 ? setView(FIT) : zoomTo(TAP_SCALE, at));
    if (e.pointerType === 'mouse') toggle();                      // click zooms in and out
    else {                                                        // touch: double-tap zooms
      const now = Date.now();
      if (now - g.lastTap < 320) { toggle(); g.lastTap = 0; } else g.lastTap = now;
    }
  };
  const onCancel = (e: React.PointerEvent) => { gesture.current.pointers.delete(e.pointerId); gesture.current.pinch = null; setMoving(false); setDrag(0); };

  if (typeof document === 'undefined') return null;
  return createPortal(
    <div ref={dialog} role="dialog" aria-modal="true" aria-label={t.lightbox.label.replace('{name}', name)}
         className="fixed inset-0 z-[100] flex flex-col bg-[#040916]/95 text-white backdrop-blur-sm">
      <div className="flex shrink-0 items-center justify-between gap-3 px-3 py-3 sm:px-5">
        <p className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold tabular-nums ring-1 ring-white/15" aria-live="polite">
          {t.lightbox.counter.replace('{n}', String(index + 1)).replace('{total}', String(total))}
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => zoomTo(view.scale / 1.5)} disabled={!zoomed} aria-label={t.lightbox.zoomOut} className={BTN}><ZoomOut className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" onClick={() => zoomTo(view.scale * 1.5)} disabled={view.scale >= MAX_SCALE - 0.001} aria-label={t.lightbox.zoomIn} className={BTN}><ZoomIn className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" data-autofocus onClick={onClose} aria-label={t.lightbox.close} className={BTN}><X className="h-5 w-5" aria-hidden="true" /></button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <div ref={stage} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onCancel}
             className={`absolute inset-0 flex touch-none select-none items-center justify-center overflow-hidden px-2 sm:px-16 ${zoomed ? (moving ? 'cursor-grabbing' : 'cursor-grab') : ''}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- the original file at full resolution, sized by the viewport */}
          <img ref={img} key={image.id} src={imageUrl(image.path)} alt={alt} draggable={false} width={image.width ?? undefined} height={image.height ?? undefined}
               className={`max-h-full max-w-full object-contain ${zoomed ? '' : 'cursor-zoom-in'} ${moving ? '' : 'transition-transform duration-200 ease-out motion-reduce:transition-none'}`}
               style={{ width: 'auto', height: 'auto', transform: `translate3d(${view.x + drag}px, ${view.y}px, 0) scale(${view.scale})`, willChange: 'transform' }} />
        </div>
        {total > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={t.lightbox.previous} className={`${BTN} absolute left-2 top-1/2 -translate-y-1/2 sm:left-4`}><ChevronLeft className="h-6 w-6" aria-hidden="true" /></button>
            <button type="button" onClick={() => go(1)} aria-label={t.lightbox.next} className={`${BTN} absolute right-2 top-1/2 -translate-y-1/2 sm:right-4`}><ChevronRight className="h-6 w-6" aria-hidden="true" /></button>
          </>
        )}
      </div>

      <div className="shrink-0 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:px-5">
        <p className="mx-auto max-w-3xl text-center text-sm text-sky-100/85">{alt}</p>
        {total > 1 && (
          <ul className="mx-auto mt-2 flex max-w-full justify-start gap-2 overflow-x-auto py-1 sm:justify-center">
            {images.map((im, i) => (
              <li key={im.id} className="shrink-0">
                <button type="button" onClick={() => onIndex(i)} aria-label={t.lightbox.show.replace('{n}', String(i + 1))} aria-current={i === index ? 'true' : undefined}
                        className={`block h-14 w-14 overflow-hidden rounded-lg bg-white/10 ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#040916] sm:h-16 sm:w-16 ${i === index ? 'ring-sky-300' : 'ring-transparent opacity-70 hover:opacity-100'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl(im.path)} alt="" loading="lazy" draggable={false} className="h-full w-full object-contain" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>,
    document.body,
  );
}
