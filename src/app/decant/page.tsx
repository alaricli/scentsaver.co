import { getProductsByType } from '../utils/shopify';
import { Edge, Product } from '@/types/types';

export default async function DecantsPage() {
  const productsData = await getProductsByType('Decant');
  const products =
    productsData?.products?.edges?.map((edge: Edge) => edge.node) || [];

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-2xl font-bold">Decants</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Price: ${product.priceRange.minVariantPrice.amount}</p>
            {product.featuredImage && (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || 'Product Image'}
                style={{ maxWidth: '200px' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
