import { getProductByHandle } from '@/app/utils/shopify';
import { Product, ProductPageProps } from '@/types/types';
import AddToCartButton from '@/app/components/carting/AddToCartButton';
import ProductPageClient from '@/app/components/product/ProductPageClient';

export default async function ProductPage({ params }: ProductPageProps) {
  const { productHandle } = params;
  const response = await getProductByHandle(productHandle);
  const product: Product = response.product;

  console.log(product.variants.edges);

  if (!product) {
    return <div>Error: Product not found</div>;
  }

  return <ProductPageClient product={product} />;
}
