import { ArrowRight, Minus } from 'lucide-react';
import Icon from '@/components/site/Icon';
import { Section, Eyebrow } from '@/components/site/Section';

const VENDORS = [
  { label: 'Scheduling tool', icon: 'CalendarDays' },
  { label: 'POS system', icon: 'CreditCard' },
  { label: 'Spreadsheets', icon: 'Sheet' },
  { label: 'Inventory app', icon: 'Boxes' },
  { label: 'Messaging apps', icon: 'MessagesSquare' },
  { label: 'Customer platform', icon: 'Contact' },
  { label: 'Reporting tool', icon: 'BarChart3' },
];

const CONSEQUENCES = [
  'Duplicate data',
  'Manual processes',
  'Poor visibility',
  'Expensive integrations',
  'Operational mistakes',
  'Weak accountability',
  'Fragmented customer experiences',
];

export default function ProblemSection() {
  return (
    <Section id="problem" className="border-t border-white/10">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
        <div className="lg:col-span-6">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.1] text-balance">
            Your business wasn&rsquo;t designed around seven different software vendors.
          </h2>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed">
            Most businesses eventually become trapped between disconnected scheduling tools, POS
            systems, spreadsheets, inventory applications, messaging apps, customer platforms, and
            reporting tools.
          </p>

          <p className="mt-8 mono-label text-gray-500">This creates</p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {CONSEQUENCES.map((c) => (
              <li key={c} className="flex items-center gap-3 text-[15px] text-gray-300">
                <Minus className="w-4 h-4 shrink-0 text-red-400/70" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Fragmented stack visual */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl border border-white/10 bg-[#060a13] p-5 sm:p-7 overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 tech-grid opacity-40" />
            <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-3">
              {VENDORS.map((v, i) => (
                <div key={v.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
                  <div className="flex items-center justify-between">
                    <Icon name={v.icon} className="w-4 h-4 text-gray-400" />
                    <span className="mono-label text-[9px] text-gray-600">Vendor {i + 1}</span>
                  </div>
                  <p className="mt-2.5 text-sm font-medium text-gray-300">{v.label}</p>
                  <div className="mt-2.5 flex gap-1" aria-hidden="true">
                    <span className="h-1 w-8 rounded bg-white/10" />
                    <span className="h-1 w-4 rounded bg-red-400/40" />
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2 flex items-center justify-center rounded-xl border border-dashed border-white/15 px-3.5 py-3 text-center text-sm text-gray-500">
                …and the next app someone signs up for
              </div>
            </div>
            <div className="relative mt-7 grid grid-cols-3 gap-2 text-center">
              {[
                ['7', 'logins'],
                ['7', 'invoices'],
                ['7', 'versions of the truth'],
              ].map(([n, l]) => (
                <div key={l} className="rounded-lg border border-red-400/15 bg-red-500/[0.04] px-2 py-2.5">
                  <p className="text-lg font-bold text-red-200/90">{n}</p>
                  <p className="text-[11px] text-gray-500 leading-tight">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 rounded-2xl border border-sky-400/25 bg-gradient-to-r from-sky-500/[0.10] via-blue-600/[0.05] to-transparent px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <p className="flex-1 text-lg sm:text-xl font-semibold text-white leading-snug text-balance">
          VexaOS replaces fragmentation with one connected operating system designed around your
          operation.
        </p>
        <a
          href="#solution"
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors shrink-0"
        >
          See how it connects
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </Section>
  );
}
