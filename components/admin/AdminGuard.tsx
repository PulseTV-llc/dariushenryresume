'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Loader2, ShieldAlert, LogOut } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { isAuthorizedAdmin } from '@/lib/admin-config';

/**
 * Route guard for the private admin area.
 *
 * Layers of protection:
 *   1. If no user is signed in → redirect to /admin/login.
 *   2. Client-side email allow-list (fast UX gate).
 *   3. SERVER-SIDE verification via /api/admin/verify (Firebase Admin verifies
 *      the ID token + email). Rendering is blocked until the server confirms.
 *
 * NOTE: This is a client-guarded page that additionally calls a server route to
 * validate the authorized email. Because Next.js App Router client pages render
 * on the client, the definitive gate is the server /api/admin/verify call — the
 * calculator UI never renders unless the server returns authorized:true.
 */
export default function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<'checking' | 'authorized' | 'denied'>('checking');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        router.replace('/admin/login?next=/admin/quote-calculator');
        return;
      }
      setEmail(user.email);

      // Fast client gate
      if (!isAuthorizedAdmin(user.email)) {
        setState('denied');
        return;
      }

      // Authoritative server gate
      try {
        const idToken = await user.getIdToken();
        const res = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
        const data = await res.json().catch(() => ({ authorized: false }));
        setState(data.authorized ? 'authorized' : 'denied');
      } catch {
        setState('denied');
      }
    });
    return () => unsub();
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth).catch(() => {});
    router.replace('/admin/login');
  };

  if (state === 'checking') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-gray-500 text-sm">Verifying access…</p>
      </div>
    );
  }

  if (state === 'denied') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center rounded-3xl border border-red-500/20 bg-red-500/[0.05] p-10">
          <span className="mx-auto mb-6 flex w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </span>
          <h1 className="text-2xl font-bold text-white mb-2">Access denied. This area is private.</h1>
          <p className="text-gray-400 text-sm mb-6">
            {email ? (
              <>The account <span className="text-gray-300">{email}</span> is not authorized.</>
            ) : (
              'You are not authorized to view this page.'
            )}
          </p>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
