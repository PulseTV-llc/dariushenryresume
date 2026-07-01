import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

// Preserved AI / custom AI machine content (formerly the homepage).
import Hero from '@/components/Hero';
import FeatureGrid from '@/components/FeatureGrid';
import AiNodeSection from '@/components/AiNodeSection';
import IndustryGrid from '@/components/IndustryGrid';
import ExamplePrompts from '@/components/ExamplePrompts';
import ServicePackages from '@/components/ServicePackages';
import PricingTiers from '@/components/PricingTiers';
import EstimatorSection from '@/components/EstimatorSection';
import AboutSection from '@/components/AboutSection';

export const metadata: Metadata = {
  title: 'AI Solutions & Private AI Workflow Systems | Darius Henry',
  description:
    'AI tools and automation are still available from Darius Henry — private AI workflow systems, custom AI business assistants, and Windows GPU AI nodes. The main focus of the site is now custom connected business systems.',
  alternates: { canonical: 'https://iamdariushenry.com/ai-solutions' },
};

export default function AiSolutionsPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-black">
        {/* Context banner: this content has moved here */}
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.06] px-6 py-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </span>
                <p className="text-sm text-gray-200 leading-relaxed">
                  <span className="font-semibold text-white">AI tools and automation are still available</span>
                  , but the main focus of IAMDariusHenry.com is now{' '}
                  <span className="text-cyan-300">custom connected business systems</span> across web,
                  mobile, and touchscreen.
                </p>
              </div>
              <Link
                href="/"
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all"
              >
                See business systems
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Preserved AI content */}
        <Hero />
        <FeatureGrid />
        <AiNodeSection />
        <IndustryGrid />
        <ExamplePrompts />
        <ServicePackages />
        <PricingTiers />
        <EstimatorSection />
        <AboutSection />
      </main>
      <SiteFooter />
    </>
  );
}
