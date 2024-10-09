import ProductPageDisplay from '@/app/components/product/ProductPageDisplay';
import { getProductByHandle } from '@/app/utils/shopify';
import { Product, ProductPageProps } from '@/types/types';

export default async function ProductPage({ params }: ProductPageProps) {
  const { productHandle } = params;
  const response = await getProductByHandle(productHandle);
  const product: Product = response.product;

  if (!product) {
    return <div>Error: Product not found</div>;
  }

  return <ProductPageDisplay product={product} />;
}
