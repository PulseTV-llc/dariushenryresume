'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './useCart';

export default function CartLink({ href, label }: { href: string; label: string }) {
  const { count } = useCart();
  return (
    <Link href={href} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3.5 text-sm font-semibold text-slate-800 hover:border-blue-300">
      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
      {label}
      {count > 0 && <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">{count}</span>}
    </Link>
  );
}
