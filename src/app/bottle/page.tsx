import ProductsDisplay from '../components/product/ProductsDisplay';

export default async function BottlesPage() {
  const initialFilter = { category: 'Bottle' };

  return (
    <div className="w-full p-4">
      <ProductsDisplay initialFilter={initialFilter} />
    </div>
  );
}
