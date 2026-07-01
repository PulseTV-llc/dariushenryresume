import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import HomeHero from '@/components/home/HomeHero';
import {
  ProblemSection,
  SolutionSection,
  DeviceEcosystemSection,
  IndustryExamplesSection,
  ShyftGridProofSection,
  FeatureModulesSection,
  ProcessSection,
  PricingPreviewSection,
  InternationalSection,
  FinalCTASection,
} from '@/components/home/HomeSections';

export const metadata: Metadata = {
  title: {
    absolute: 'Custom Web, Mobile & Touchscreen Business Systems | Darius Henry',
  },
  description:
    'Darius Henry builds custom connected business systems across web apps, iOS, Android, touchscreen kiosks, dashboards, staff tools, customer portals, scheduling, payments, and real-time operations.',
  alternates: { canonical: 'https://iamdariushenry.com' },
  openGraph: {
    title: 'Custom Connected Business Systems for Web, Mobile & Touchscreen',
    description:
      'Premium custom software systems for salons, restaurants, stores, clinics, field teams, and modern businesses that need web dashboards, mobile apps, touchscreen tools, and real-time operations.',
    url: 'https://iamdariushenry.com',
  },
};

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-black">
        <HomeHero />
        <ProblemSection />
        <SolutionSection />
        <DeviceEcosystemSection />
        <IndustryExamplesSection />
        <ShyftGridProofSection />
        <FeatureModulesSection />
        <ProcessSection />
        <PricingPreviewSection />
        <InternationalSection />
        <FinalCTASection />
      </main>
      <SiteFooter />
    </>
  );
}
