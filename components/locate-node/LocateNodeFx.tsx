'use client';

import { useEffect } from 'react';

/**
 * All of the page's motion, in one small script that only toggles classes and CSS variables
 * (the styles are under "Locate Node" in app/globals.css):
 *   [data-ln-reveal]   gets .is-in when it enters the screen
 *   [data-ln-scrub]    gets --ln-p (0..1) as it crosses the screen: words brighten, images drift
 *   [data-ln-count]    counts up to its number once, when revealed
 *   [data-ln-bar]      the buy bar, shown between the hero ([data-ln-hero]) and the final section ([data-ln-end])
 * With prefers-reduced-motion everything is simply shown, and nothing moves.
 */
export default function LocateNodeFx({ root }: { root: string }) {
  useEffect(() => {
    const el = document.getElementById(root);
    if (!el) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = Array.from(el.querySelectorAll<HTMLElement>('[data-ln-reveal]'));
    const counts = Array.from(el.querySelectorAll<HTMLElement>('[data-ln-count]'));
    const bar = el.querySelector<HTMLElement>('[data-ln-bar]');
    const hero = el.querySelector<HTMLElement>('[data-ln-hero]');
    const showBar = (on: boolean) => { if (bar) { bar.dataset.on = on ? 'true' : 'false'; bar.inert = !on; } };

    if (still || !('IntersectionObserver' in window)) {
      el.dataset.still = 'true';
      reveals.forEach((r) => r.classList.add('is-in'));
      counts.forEach((c) => { c.textContent = c.dataset.lnCount ?? ''; });
    }
    const count = (c: HTMLElement) => {
      const target = Number(c.dataset.lnCount) || 0;
      const start = performance.now(), ms = 900;
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / ms);
        c.textContent = String(Math.round(target * (1 - (1 - k) ** 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const seen = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        (e.target as HTMLElement).querySelectorAll<HTMLElement>('[data-ln-count]').forEach(count);
        if ((e.target as HTMLElement).dataset.lnCount) count(e.target as HTMLElement);
        seen.unobserve(e.target);
      }
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    if (!still) reveals.forEach((r) => seen.observe(r));

    // the buy bar appears when the hero's own buttons are gone
    // ... and steps aside again at the end, where the same button is on the page itself
    const end = el.querySelector<HTMLElement>('[data-ln-end]');
    const visible = { hero: true, end: false };
    const sync = () => showBar(!visible.hero && !visible.end);
    const heroWatch = hero ? new IntersectionObserver(([e]) => { visible.hero = e.isIntersecting; sync(); }, { threshold: 0.05 }) : null;
    if (hero && heroWatch) heroWatch.observe(hero);
    const endWatch = end ? new IntersectionObserver(([e]) => { visible.end = e.isIntersecting; sync(); }, { threshold: 0.25 }) : null;
    if (end && endWatch) endWatch.observe(end);

    let frame = 0;
    const scrubs = still ? [] : Array.from(el.querySelectorAll<HTMLElement>('[data-ln-scrub]'));
    const apply = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const s of scrubs) {
        const r = s.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        // 0 when its top reaches 85% of the screen, 1 when its bottom reaches 45%
        const p = (vh * 0.85 - r.top) / (r.height + vh * 0.4);
        s.style.setProperty('--ln-p', Math.min(1, Math.max(0, p)).toFixed(3));
      }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(apply); };
    if (scrubs.length) {
      window.addEventListener('scroll', queue, { passive: true });
      window.addEventListener('resize', queue, { passive: true });
      queue();
    }
    return () => {
      seen.disconnect();
      heroWatch?.disconnect();
      endWatch?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, [root]);
  return null;
}
