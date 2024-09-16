import ProductCard from '../components/ProductCard';
import { getProductsByType } from '../utils/shopify';
import { Edge, Product } from '@/types/types';

export default async function DecantsPage() {
  const productsData = await getProductsByType('Decant');
  const products =
    productsData?.products?.edges?.map((edge: Edge) => edge.node) || [];

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-2xl font-bold">Decants</h1>
      <li>
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </li>
    </div>
  );
}
