import { getProductsByType } from '@/app/utils/shopify';
import ProductCard from './ProductCard';
import { Edge, Product } from '@/types/types';

export default async function ProductDisplay({
  pageTitle,
  displayType,
}: {
  pageTitle: string;
  displayType: string;
}) {
  const productsData = await getProductsByType(displayType);
  const products =
    productsData?.products?.edges?.map((edge: Edge) => edge.node) || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="my-4 text-2xl font-bold">{pageTitle}</h1>
      <div>
        <ul>
          <li>TODO: sort feature on the right side of title</li>
          <li>TODO: filter feature on the left side of the page</li>
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
