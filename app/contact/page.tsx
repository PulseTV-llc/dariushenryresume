import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Building2, Cpu, ArrowUpRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import VexaContactForm from '@/components/site/VexaContactForm';
import { PageHero } from '@/components/site/Section';
import { SITE_URL, APP_URL, CONTACT_EMAIL } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'Contact — Sales, quotes, and enterprise enquiries',
  description:
    'Talk to VexaOS about pricing, multi-location deployments, hardware quotes, or enterprise and franchise requirements.',
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Contact"
          title="Talk to us about your operation."
          subtitle="Pricing, multi-location rollouts, hardware quotes, or an enterprise agreement — you will get a real answer from someone who knows the platform."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          <div className="grid gap-10 lg:grid-cols-12">
            <aside className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
                <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-white/10 items-center justify-center">
                  <Building2 className="w-5 h-5 text-sky-300" />
                </span>
                <h2 className="mt-5 text-base font-semibold text-white">Sales &amp; pricing</h2>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  Quotes for single sites, multi-location groups, franchise networks, and
                  enterprise agreements — including volume and custom terms.
                </p>
                <Link
                  href="/pricing"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                >
                  See standard pricing first
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
                <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-white/10 items-center justify-center">
                  <Cpu className="w-5 h-5 text-sky-300" />
                </span>
                <h2 className="mt-5 text-base font-semibold text-white">Hardware quotes</h2>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  Tell us your floor plan and traffic and we will size the kiosks and boards, then
                  quote purchase or lease terms.
                </p>
                <Link
                  href="/hardware"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                >
                  Hardware and sizes
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
                <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-white/10 items-center justify-center">
                  <Mail className="w-5 h-5 text-sky-300" />
                </span>
                <h2 className="mt-5 text-base font-semibold text-white">Prefer email?</h2>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  Reach us directly at{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sky-300 hover:text-sky-200 underline underline-offset-2"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
                <a
                  href={APP_URL}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                >
                  Existing customer? Log in
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </aside>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
                <VexaContactForm variant="contact" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
