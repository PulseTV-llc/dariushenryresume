import { notFound } from 'next/navigation';
import Unsubscribe from '@/components/mobile-gateway/Unsubscribe';
import { isLocale, localePath } from '@/lib/i18n/config';
import { MOBILE_GATEWAY_PATH, mobileGatewayStrings } from '@/lib/mobile-gateway/strings';
import '@/components/mobile-gateway/mobile-gateway.css';

export function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return {};
  return { title: { absolute: mobileGatewayStrings(params.locale).unsubscribe.metaTitle }, robots: { index: false, follow: false } };
}

/** The launch list's unsubscribe page. Not indexed; the token stays in the link's fragment. */
export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = mobileGatewayStrings(params.locale);
  return (
    <div className="mg min-h-[80vh] px-5 pb-24 pt-36 sm:px-8">
      <Unsubscribe t={t.unsubscribe} back={localePath(params.locale, MOBILE_GATEWAY_PATH)} />
    </div>
  );
}
