import type { Metadata } from 'next';
import FleetShell from '@/components/fleet-admin/FleetShell';

export const metadata: Metadata = { title: 'Fleet', robots: { index: false, follow: false } };

/** Fleet management on admin.vexaos.io (and /admin/fleet on the main site). Same light look and sign-in as the store admin. */
export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 text-slate-900"><FleetShell>{children}</FleetShell></div>;
}
