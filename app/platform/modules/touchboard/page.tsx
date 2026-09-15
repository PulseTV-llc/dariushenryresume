import ModuleDetail, { moduleMetadata } from '@/components/marketing/ModuleDetail';
import { PRODUCTS_BY_SLUG } from '@/lib/vexaos';

const product = PRODUCTS_BY_SLUG.touchboard;

export const metadata = moduleMetadata(product);

export default function TouchBoardModulePage() {
  return <ModuleDetail product={product} />;
}
