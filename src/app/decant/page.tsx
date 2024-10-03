import ProductDisplay from '../components/product/ProductDisplay';

export default async function DecantsPage() {
  const sortType = 'CREATED_AT';
  const first = 40;
  const initialFilter = { category: 'Decant' };

  return (
    <div className="container mx-auto p-4">
      <ProductDisplay
        pageTitle="Decants"
        sortType={sortType}
        first={first}
        filter={initialFilter}
      />
    </div>
  );
}
