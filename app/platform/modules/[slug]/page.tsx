import { notFound } from 'next/navigation';
import ModuleDetail, { moduleMetadata } from '@/components/marketing/ModuleDetail';
import { PRODUCTS, PRODUCTS_BY_SLUG } from '@/lib/vexaos';

export function generateStaticParams() {
  // TouchBoard has its own static folder (it also hosts /demo).
  return PRODUCTS.filter((p) => p.slug !== 'touchboard').map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = PRODUCTS_BY_SLUG[params.slug];
  return product ? moduleMetadata(product) : {};
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS_BY_SLUG[params.slug];
  if (!product) notFound();
  return <ModuleDetail product={product} />;
}
