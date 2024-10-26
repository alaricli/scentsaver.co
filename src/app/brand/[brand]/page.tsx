import ProductsDisplay from '@/app/components/product/ProductsDisplay';

export default async function BrandPage(props: {
  params: Promise<{ brand: string }>;
}) {
  const params = await props.params;
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
