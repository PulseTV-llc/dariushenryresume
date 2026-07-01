import type { Metadata } from 'next';
import { Clock, MessageSquare, ShieldCheck, Mail } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import BusinessContactForm from '@/components/business/BusinessContactForm';

export const metadata: Metadata = {
  title: 'Contact | Request a Business System Blueprint',
  description:
    'Tell Darius Henry about your business and get a custom connected system plan and quote — web dashboards, iOS and Android apps, touchscreen tools, and real-time operations built around your workflow.',
  alternates: { canonical: 'https://iamdariushenry.com/contact' },
};

const assurances = [
  { icon: MessageSquare, title: 'A real plan, not a sales pitch', detail: 'You get a system plan and clear quote shaped around your actual business.' },
  { icon: Clock, title: 'Fast, thoughtful reply', detail: 'Every message gets a real reply from our team with clear next steps.' },
  { icon: ShieldCheck, title: 'Your details stay private', detail: 'Used only to prepare your quote — never shared or sold.' },
];

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-black">
        <section className="relative pt-36 pb-8 px-4 sm:px-6 lg:px-8 grid-background overflow-hidden">
          <div className="absolute top-10 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-cyan-200">
                Let's build it
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
              Tell us about your business.
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Share a few details and we'll come back with a VexaOS system plan and a clear quote —
              built around the way your business actually works.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Assurances */}
            <aside className="lg:col-span-1 space-y-5">
              {assurances.map(({ icon: I, title, detail }) => (
                <div key={title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 items-center justify-center mb-4">
                    <I className="w-5 h-5 text-cyan-300" />
                  </span>
                  <h3 className="text-white font-semibold mb-1.5">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{detail}</p>
                </div>
              ))}

              {/* Prefer email? */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-cyan-300" />
                </span>
                <h3 className="text-white font-semibold mb-1.5">Prefer email?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Reach us directly at{' '}
                  <a
                    href="mailto:support@vexaos.io"
                    className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                  >
                    support@vexaos.io
                  </a>
                  .
                </p>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-10">
                <BusinessContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
