import ProductPageDisplay from '@/app/components/product/ProductPageDisplay';
import { getProductByHandle } from '@/app/utils/shopify';
import { Product } from '@/types/types';

export default async function ProductPage({
  params,
}: {
  params: { productHandle: string };
}) {
  const { productHandle } = params;
  const response = await getProductByHandle(productHandle);
  const product: Product | null = response?.product;

  if (!product) {
    return <div>Error: Product not found</div>;
  }

  return <ProductPageDisplay product={product} />;
}
