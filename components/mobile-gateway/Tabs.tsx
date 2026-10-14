'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

/**
 * Accessible tabs (WAI-ARIA tabs pattern: arrow keys, Home and End move between tabs). The panels are rendered on
 * the server and passed in; hidden panels stay in the page (and their lazy images stay unloaded) until chosen.
 */
export default function Tabs({ label, tabs, panels, className = '', listClassName = '' }: { label: string; tabs: string[]; panels: ReactNode[]; className?: string; listClassName?: string }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (i: number) => { const n = (i + tabs.length) % tabs.length; setActive(n); refs.current[n]?.focus(); refs.current[n]?.scrollIntoView({ block: 'nearest', inline: 'nearest' }); };
  const onKey = (e: KeyboardEvent) => {
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); move(active + 1); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); move(active - 1); }
    else if (k === 'Home') { e.preventDefault(); move(0); }
    else if (k === 'End') { e.preventDefault(); move(tabs.length - 1); }
  };
  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className={`mg-tabs ${listClassName}`} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button key={t} ref={(r) => { refs.current[i] = r; }} type="button" role="tab" id={`${base}-t${i}`} aria-controls={`${base}-p${i}`} aria-selected={i === active}
                  tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)} className="mg-tab">{t}</button>
        ))}
      </div>
      {panels.map((p, i) => (
        <div key={i} role="tabpanel" id={`${base}-p${i}`} aria-labelledby={`${base}-t${i}`} hidden={i !== active} tabIndex={0} className={i === active ? 'mg-fade-in' : undefined}>
          {p}
        </div>
      ))}
    </div>
  );
}
