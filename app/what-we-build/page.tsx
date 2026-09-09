import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, Section, SectionHeading, CTABand } from '@/components/site/Section';
import { SITE_URL } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'What We Build — Custom business systems',
  description:
    'VexaOS builds connected business systems organized by outcome: workforce, field and facility operations, inventory and assets, Android kiosks, connected hardware, dashboards, custom workflows, and integrations.',
  alternates: { canonical: `${SITE_URL}/what-we-build` },
};

const CATEGORIES: [string, string, string][] = [
  ['Workforce Systems', 'Scheduling, attendance, availability, time tracking, overtime and equalization, approvals, and workforce rules — on employee phones and shared tablets.', 'NFC clock-in on a shared Android tablet with a supervisor dashboard.'],
  ['Field Operations', 'Field employee apps with identity, assignments, routes, task checklists, photo proof, and issue reporting from anywhere.', 'A technician taps in at a site, works a checklist, uploads photo proof.'],
  ['Facility Operations', 'Assigned facilities, cleaning and service tasks, inspections, scores, supply tracking, and supervisor review.', 'Facility scoring that rolls task completion and inspections into one view.'],
  ['Inventory + Asset Systems', 'Products and assets, barcode scanning, stock movement, receiving, recipes/BOM, and full history.', 'Barcode receiving that depletes ingredients as items sell.'],
  ['Android Kiosks', 'Dedicated-device kiosk mode, employee terminals, customer check-in, ordering, and touchscreen interfaces.', 'A wall-mounted board showing schedules, open shifts, and announcements.'],
  ['Connected Hardware', 'NFC readers, barcode scanners, QR systems, printers, sensors, cameras, and displays — integrated, not bolted on.', 'NFC employee badges that identify a person in under a second.'],
  ['Business Dashboards', 'Real-time management for schedules, employees, inventory, approvals, reporting, and analytics.', 'One dashboard across every location and device, with an audit trail.'],
  ['Custom Workflows', 'Replace paperwork, spreadsheets, manual approvals, and disconnected steps with connected, automated flows.', 'An approval that notifies the right manager and records the decision.'],
  ['Integrations', 'Connect existing business software with custom APIs, databases, webhooks, and third-party platforms.', 'Push events into the tools your team already uses.'],
];

export default function WhatWeBuild() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="What we build"
          title="Organized around outcomes, not product SKUs."
          subtitle="You describe the operational problem. VexaOS designs the system — assembled from proven, reusable building blocks so we can build sophisticated custom software faster."
        />
        <Section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(([t, d, ex]) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h2 className="text-base font-semibold text-white">{t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{d}</p>
                <p className="mt-4 border-t border-white/10 pt-3 text-xs text-gray-500">
                  <span className="font-mono uppercase tracking-wider text-sky-300/80">Example</span> — {ex}
                </p>
              </div>
            ))}
          </div>
        </Section>
        <CTABand
          title="Built around your operation — not your industry label."
          subtitle="Manufacturing, restaurants, facilities, retail, healthcare operations, hospitality, and multi-location businesses all run differently. We build to how yours works."
          primary={{ label: 'Build My System', href: '/contact' }}
          secondary={{ label: 'See what we build', href: '/systems' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
