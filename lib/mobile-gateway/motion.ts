/** Runs before first paint (inline in the page) so the hero starts dark instead of flashing its final frame.
 *  Skipped for visitors who prefer reduced motion: they get the complete, static page. */
export const motionBoot = (root: string) =>
  `(function(){try{var e=document.getElementById(${JSON.stringify(root)});if(e&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window)e.dataset.motion='on'}catch(_){}})();`;
