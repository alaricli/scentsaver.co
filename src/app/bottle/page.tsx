import ProductsDisplay from '../components/product/ProductsDisplay';

export default async function BottlesPage() {
  const initialFilter = {
    category: 'Bottle',
  };

  return (
    <main className="w-full p-4" aria-labelledby="page-title">
      <ProductsDisplay initialFilter={initialFilter} />
    </main>
  );
}
