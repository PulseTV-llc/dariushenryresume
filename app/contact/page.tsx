import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Mail, FileText, Globe2, ArrowUpRight, Layers } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import IntakeFromParams from '@/components/marketing/intake/IntakeFromParams';
import SystemIntakeForm from '@/components/marketing/intake/SystemIntakeForm';
import { APP_URL, CONTACT_EMAIL, SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: 'Contact — Design Your Business Operating System',
  description:
    'Tell VexaOS how your business operates: locations, people, software, devices, and the problems to solve. Start a system discovery conversation or a Business Blueprint — worldwide.',
  alternates: { canonical: `${SITE_URL}/contact` },
};

const ASIDE = [
  {
    icon: Layers,
    title: 'What happens next',
    body: 'We review how your business operates, then reply by email to schedule a discovery conversation about what to connect, automate, rebuild, or replace.',
  },
  {
    icon: FileText,
    title: 'Prefer a documented plan first?',
    body: 'Choose “Start with a Business Blueprint” in the last step for a system design, roadmap, and budget range before development.',
  },
  {
    icon: Globe2,
    title: 'Anywhere in the world',
    body: 'Built in America. Delivered worldwide. Discovery sessions are scheduled to overlap your business hours.',
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <section className="relative pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 grid-background opacity-30 pointer-events-none" />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/3 w-[46rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(closest-side, rgba(14,165,233,0.14), rgba(14,165,233,0))' }}
          />
          <div className="relative max-w-7xl mx-auto grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="mono-label text-sky-300/90">System discovery</p>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.06] text-balance">
                Let&rsquo;s Design Your Business Operating System.
              </h1>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                Tell us how your company actually works — the locations, the people, the software you run on today, and
                what keeps breaking. It takes about four minutes.
              </p>

              <div className="hidden lg:block">
                <ContactAside />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-[#050912]/90 p-5 sm:p-9 shadow-2xl shadow-black/40">
                <Suspense fallback={<SystemIntakeForm variant="full" placement="contact_page" />}>
                  <IntakeFromParams variant="full" placement="contact_page" />
                </Suspense>
              </div>
            </div>

            <div className="lg:hidden">
              <ContactAside />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ContactAside() {
  return (
    <>
      <ul className="space-y-4 lg:mt-10">
        {ASIDE.map(({ icon: I, title, body }) => (
          <li key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <span className="inline-flex w-10 h-10 shrink-0 rounded-xl bg-sky-500/10 border border-sky-400/20 items-center justify-center">
              <I className="w-[18px] h-[18px] text-sky-300" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-white">{title}</h2>
              <p className="mt-1 text-sm text-gray-400 leading-relaxed">{body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-2 text-sm text-gray-400">
        <p className="flex items-center gap-2.5">
          <Mail className="w-4 h-4 text-sky-400" />
          Prefer email?{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-300 hover:text-sky-200 underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p>
          <a
            href={APP_URL}
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
          >
            Existing client? Log in
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </p>
      </div>
    </>
  );
}
