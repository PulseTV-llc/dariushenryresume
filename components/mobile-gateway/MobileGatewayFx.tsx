'use client';

import { useEffect } from 'react';

/**
 * All of the page's scroll motion, in one small script that only sets classes, attributes and CSS variables
 * (styles in mobile-gateway.css). Native scrolling throughout: nothing is hijacked.
 *   [data-mg-reveal]  gets .is-in when it enters the screen
 *   [data-mg-scrub]   gets --p (0..1) as it crosses the screen (hero reveal, statement, closing)
 *   [data-mg-spy]     the section the sub-navigation marks as current
 *   [data-mg-pause]   the button that pauses and resumes every looping animation on the page
 * With prefers-reduced-motion nothing of this runs and every element is shown complete.
 */
export default function MobileGatewayFx({ root }: { root: string }) {
  useEffect(() => {
    const el = document.getElementById(root);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    // motion opt-in (normally already set by the inline script before first paint)
    const still = reduce.matches || !('IntersectionObserver' in window);
    if (still) { delete el.dataset.motion; } else { el.dataset.motion = 'on'; }

    // pause / play
    const pause = el.querySelector<HTMLButtonElement>('[data-mg-pause]');
    const setPaused = (on: boolean) => {
      el.dataset.paused = on ? 'true' : 'false';
      if (pause) { pause.setAttribute('aria-pressed', on ? 'true' : 'false'); pause.querySelector('[data-label]')!.textContent = on ? pause.dataset.play! : pause.dataset.pause!; }
    };
    const onPause = () => setPaused(el.dataset.paused !== 'true');
    pause?.addEventListener('click', onPause);

    // reveals
    const seen = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); seen.unobserve(e.target); }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    if (!still) el.querySelectorAll('[data-mg-reveal]').forEach((r) => seen.observe(r));

    // the section in view, for the sub-navigation
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('[data-mg-subnav] a[href^="#"]'));
    const spy = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const id = (e.target as HTMLElement).dataset.mgSpy;
        links.forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === `#${id}` ? 'true' : 'false'));
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    el.querySelectorAll('[data-mg-spy]').forEach((s) => spy.observe(s));

    // scroll-linked progress
    let frame = 0;
    const scrubs = still ? [] : Array.from(el.querySelectorAll<HTMLElement>('[data-mg-scrub]'));
    const apply = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const s of scrubs) {
        const r = s.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        let p: number;
        if (s.dataset.mgScrub === 'pin') {
          // a tall section with a sticky stage: 0 at its top, 1 when the stage is about to leave
          p = -r.top / Math.max(1, r.height - vh * 0.85);
        } else {
          // 0 when its top reaches 88% of the screen, 1 when its bottom reaches 45%
          p = (vh * 0.88 - r.top) / (r.height + vh * 0.43);
        }
        s.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(3));
      }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(apply); };
    if (scrubs.length) {
      window.addEventListener('scroll', queue, { passive: true });
      window.addEventListener('resize', queue, { passive: true });
      queue();
    }
    // if the visitor turns on reduced motion while here, show everything complete
    const onReduce = () => { if (reduce.matches) { delete el.dataset.motion; scrubs.forEach((s) => s.style.removeProperty('--p')); } };
    reduce.addEventListener?.('change', onReduce);
    return () => {
      seen.disconnect(); spy.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue);
      pause?.removeEventListener('click', onPause); reduce.removeEventListener?.('change', onReduce);
    };
  }, [root]);
  return null;
}

