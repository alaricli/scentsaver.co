import { getFilters, getProducts } from '@/app/utils/shopify';
import ProductDisplayClient from './ProductDisplayClient';
import { parseFilters } from '@/app/utils/helpers';

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
  const filtersData = await getFilters();
  const filters = parseFilters(filtersData);

  return (
    <div className="container mx-auto p-4">
      {/* Temporary display of filters for debugging */}
      {/* <div className="my-4">
        <h2>Fetched Filters:</h2>
        <pre>{JSON.stringify(filters, null, 2)}</pre>{' '}
      </div> */}
      <ProductDisplayClient
        pageTitle={pageTitle}
        initialSortType={sortType}
        filters={filters}
      />
    </div>
  );
}
