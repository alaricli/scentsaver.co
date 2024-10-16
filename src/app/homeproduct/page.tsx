import ProductsDisplay from '../components/product/ProductsDisplay';

export default async function HomeProductsPage() {
  const initialFilter = { category: 'Home' };

  return (
    <div className="w-full p-4">
      <ProductsDisplay initialFilter={initialFilter} />
    </div>
  );
}
