import { getProducts, getProductsByType } from '@/app/utils/shopify';
import ProductCard from './ProductCard';
import { Edge, Product } from '@/types/types';
import ProductDisplayClient from './ProductDisplayClient';

export default async function ProductDisplay({
  pageTitle,
  sortType,
  reverse,
  first,
  filter,
}: {
  pageTitle: string;
  sortType: string;
  reverse: boolean;
  first: number;
  filter: { brand?: string; variant?: string };
}) {
  // Fetch products with the passed parameters
  const productsData = await getProducts({
    sortType,
    reverse,
    first,
    filter,
  });

  // Map the products data to the product nodes
  const products = productsData.edges.map((edge: any) => edge.node);

  return (
    <div className="container mx-auto p-4">
      <h1 className="my-4 text-2xl font-bold">{pageTitle}</h1>
      <ProductDisplayClient
        products={products}
        initialSortType={sortType}
        initialReverse={reverse}
      />
    </div>
  );
}
