import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Store admin', robots: { index: false, follow: false } };

/** The store admin is light and built for a phone first; the older internal tools keep their dark shell. */
export default function StoreAdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
}
