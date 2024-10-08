import ProductDisplay from '../components/product/ProductDisplay';

export default async function DecantsPage() {
  const initialFilter = { category: 'Decant' };

  return (
    <div className="w-full p-4">
      <ProductDisplay initialFilter={initialFilter} />
    </div>
  );
}
