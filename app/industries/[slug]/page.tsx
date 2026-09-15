import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import IndustryLanding from '@/components/marketing/IndustryLanding';
import { INDUSTRIES, INDUSTRIES_BY_SLUG } from '@/lib/marketing/industries';
import { SITE_URL, OG_IMAGES } from '@/lib/marketing/site';

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = INDUSTRIES_BY_SLUG[params.slug];
  if (!industry) return {};
  const url = `${SITE_URL}/industries/${industry.slug}`;
  return {
    title: industry.seoTitle,
    description: industry.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: `${industry.seoTitle} · VexaOS`, description: industry.seoDescription, url, images: OG_IMAGES },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = INDUSTRIES_BY_SLUG[params.slug];
  if (!industry) notFound();

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <IndustryLanding industry={industry} />
      </main>
      <SiteFooter />
    </>
  );
}
