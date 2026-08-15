import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import HomeHero from '@/components/home/HomeHero';
import { CTABand } from '@/components/site/Section';
import {
  ProblemSection,
  ProductsSection,
  PlatformSection,
  OutcomesSection,
  IndustriesSection,
  HardwareSection,
  ProofSection,
} from '@/components/home/HomeSections';
import { SITE_URL } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: {
    absolute: 'VexaOS — One Operating System for Your Entire Business',
  },
  description:
    'VexaOS connects your workforce, commerce, inventory, customer experiences, and business hardware through one platform. ShyftGrid, Commerce Ops, Inventory Ops, VexaFront, and TouchBoard on one identity and one data layer.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'VexaOS — One Operating System for Your Entire Business',
    description:
      'Connect your workforce, commerce, inventory, customer experiences, and business hardware through one platform.',
    url: SITE_URL,
  },
};

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <HomeHero />
        <ProblemSection />
        <ProductsSection />
        <PlatformSection />
        <OutcomesSection />
        <IndustriesSection />
        <HardwareSection />
        <ProofSection />
        <CTABand
          title="See VexaOS running your business."
          subtitle="A 30-minute walkthrough against your actual operation — your locations, your products, your shifts."
        />
      </main>
      <SiteFooter />
    </>
  );
}
