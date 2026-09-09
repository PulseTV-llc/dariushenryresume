import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import HomeHero from '@/components/home/HomeHero';
import { CTABand } from '@/components/site/Section';
import {
  ProblemSection,
  ControlCenterSection,
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
    absolute: 'VexaOS — Custom Business Systems, Built Without Borders',
  },
  description:
    'VexaOS designs and builds custom business systems that connect your people, devices, workflows, and operations — Android apps, NFC clock-in, kiosks, dashboards, and workflow automation. Built for businesses around the world.',
  keywords: [
    'custom business software',
    'custom Android business apps',
    'business operations software',
    'Android kiosk development',
    'NFC employee systems',
    'custom management dashboards',
    'business workflow automation',
    'connected business systems',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'VexaOS — We build the software your business actually needs',
    description:
      'Custom business systems that connect your people, devices, workflows, and operations. Detroit → Bangkok → Anywhere.',
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
        <ControlCenterSection />
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
