import { notFound } from 'next/navigation';
import MobileGatewayPage from '@/components/mobile-gateway/MobileGatewayPage';
import { pageMeta } from '../../../metadata';
import { isLocale, localePath, LOCALE_INFO } from '@/lib/i18n/config';
import { locateNodeLink } from '@/lib/locate-node/nav';
import { MOBILE_GATEWAY_PATH, mobileGatewayStrings } from '@/lib/mobile-gateway/strings';
import { OG_IMAGE } from '@/lib/mobile-gateway/images';
import { SITE_URL } from '@/lib/site';

// the Locate Node card follows the store (linked while its page exists), like the navigation
export const revalidate = 300;

export function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return {};
  const t = mobileGatewayStrings(params.locale);
  const meta = pageMeta(params.locale, MOBILE_GATEWAY_PATH, t.meta, true);
  const images = [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: t.meta.imageAlt }];
  return { ...meta, openGraph: { ...meta.openGraph, images }, twitter: { ...meta.twitter, images: [OG_IMAGE.url] } };
}

/** /products/mobile-gateway: the launch page. Truthful structured data only: no price, offer, rating, date or identifier. */
export default async function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = mobileGatewayStrings(locale);
  const url = `${SITE_URL}${localePath(locale, MOBILE_GATEWAY_PATH)}`;
  const schemas = [
    {
      '@context': 'https://schema.org', '@type': 'Product', name: t.name, description: t.meta.description, url, image: `${SITE_URL}${OG_IMAGE.url}`,
      brand: { '@type': 'Brand', name: 'VexaOs' }, category: 'Industrial IoT gateway', inLanguage: LOCALE_INFO[locale].tag,
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: LOCALE_INFO[locale].tag,
      mainEntity: t.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, '\\u003c') }} />)}
      <MobileGatewayPage t={t} locale={locale} locateNode={await locateNodeLink(locale)} source={MOBILE_GATEWAY_PATH} />
    </>
  );
}
