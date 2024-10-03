import ProductDisplay from '../components/product/ProductDisplay';

export default async function BottlesPage() {
  const sortType = 'CREATED_AT';
  const first = 40;
  const initialFilter = { category: 'Bottle' };

  return (
    <div className="container mx-auto p-4">
      <ProductDisplay
        pageTitle="Full Bottles"
        sortType={sortType}
        first={first}
        filter={initialFilter}
      />
    </div>
  );
}
