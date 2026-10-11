'use client';

import { useEffect } from 'react';

/**
 * The hero's two interactive touches, kept tiny: a soft spotlight that follows
 * a mouse (not touch), and depth on scroll. Both only write CSS variables that
 * app/globals.css reads. Nothing runs when the visitor prefers reduced motion.
 */
export default function StoreHeroFx({ target }: { target: string }) {
  useEffect(() => {
    const el = document.getElementById(target);
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      // 0 while the card's top is at the top of the screen, 1 once it has scrolled away
      el.style.setProperty('--sh-p', Math.min(1, Math.max(0, -r.top / Math.max(r.height, 1) + 0.12)).toFixed(3));
      if (pointer) {
        el.style.setProperty('--sh-x', `${(pointer.x - r.left).toFixed(0)}px`);
        el.style.setProperty('--sh-y', `${(pointer.y - r.top).toFixed(0)}px`);
      }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(apply); };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer = { x: e.clientX, y: e.clientY };
      el.dataset.spot = 'on';
      queue();
    };
    const leave = () => { delete el.dataset.spot; };

    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave, { passive: true });
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    queue();
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, [target]);
  return null;
}
