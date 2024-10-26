import ProductsDisplay from '@/app/components/product/ProductsDisplay';

export default async function BrandPage({
  params,
}: {
  params: { brand: string };
}) {
  const brand = decodeURIComponent(params.brand);

  const initialFilter = {
    category: '',
    brand: brand,
  };

  return (
    <main className="w-full p-4" aria-labelledby="page-title">
      <ProductsDisplay initialFilter={initialFilter} />
    </main>
  );
}
