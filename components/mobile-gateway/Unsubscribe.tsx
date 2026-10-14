'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { TOKEN } from '@/lib/mobile-gateway/launch-list';
import type { MobileGatewayStrings } from '@/lib/mobile-gateway/strings';

/** Reads the token from the link (#t=… or ?token=…) and unsubscribes only when the person presses the button. */
export default function Unsubscribe({ t, back }: { t: MobileGatewayStrings['unsubscribe']; back: string }) {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'invalid' | 'error'>('idle');
  useEffect(() => {
    const fromHash = new URLSearchParams(window.location.hash.slice(1)).get('t');
    const fromQuery = new URLSearchParams(window.location.search).get('token');
    const v = fromHash ?? fromQuery;
    setToken(v && TOKEN.test(v) ? v : null);
  }, []);
  async function go() {
    setState('busy');
    try {
      const res = await fetch('/api/launch-list/unsubscribe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token }) });
      const body = await res.json().catch(() => ({}));
      setState(res.ok ? (body.found ? 'done' : 'invalid') : 'error');
    } catch { setState('error'); }
  }
  return (
    <div className="mg-panel mx-auto max-w-xl p-7 text-center sm:p-10">
      {state === 'done' ? (
        <div role="status">
          <CheckCircle2 className="mx-auto h-11 w-11 text-[#45B8FF]" aria-hidden="true" />
          <h1 className="mg-h3 mt-5">{t.done}</h1>
          <p className="mg-body mt-3">{t.doneBody}</p>
        </div>
      ) : (
        <>
          <h1 className="mg-h3">{t.title}</h1>
          <p className="mg-body mt-4">{token === null ? t.missing : t.body}</p>
          {state === 'invalid' && <p role="alert" className="mt-4 text-sm text-[#FDA29B]">{t.invalid}</p>}
          {state === 'error' && <p role="alert" className="mt-4 text-sm text-[#FDA29B]">{t.error}</p>}
          {token && state !== 'invalid' && (
            <button type="button" onClick={go} disabled={state === 'busy'} className="mg-btn mg-btn-primary mt-7">
              {state === 'busy' ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{t.working}</> : t.button}
            </button>
          )}
        </>
      )}
      <p className="mt-8"><Link href={back} className="mg-link-cta">{t.back}</Link></p>
    </div>
  );
}
