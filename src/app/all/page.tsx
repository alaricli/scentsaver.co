'use client';

import { useSearchParams } from 'next/navigation';
import ProductsDisplay from '../components/product/ProductsDisplay';

export default async function ShopAllPage() {
  const searchParams = useSearchParams();

  const category = searchParams.get('category');
  const brand = searchParams.get('brand');

  const initialFilter = {
    category: category || '', // If category is present, use it, otherwise default to empty
    brand: brand || '', // If brand is present, use it, otherwise default to empty
  };

  return (
    <div className="w-full p-4">
      <ProductsDisplay initialFilter={initialFilter} />
    </div>
  );
}
