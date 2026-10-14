'use client';

import { useState } from 'react';

/** Opens or closes every specification group at once (each group is a native <details>, usable on its own). */
export default function SpecsToggle({ target, expand, collapse }: { target: string; expand: string; collapse: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" aria-controls={target} aria-expanded={open} className="mg-btn mg-btn-ghost mg-btn-sm"
            onClick={() => { const next = !open; document.getElementById(target)?.querySelectorAll('details').forEach((d) => { d.open = next; }); setOpen(next); }}>
      {open ? collapse : expand}
    </button>
  );
}
