import ProductsDisplay from '../components/product/ProductsDisplay';

export default async function HomeProductsPage() {
  const initialFilter = { category: 'Home' };

  return (
    <main className="w-full p-4">
      <ProductsDisplay initialFilter={initialFilter} />
    </main>
  );
}
