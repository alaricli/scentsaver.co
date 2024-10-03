import ProductDisplay from '../components/product/ProductDisplay';

export default async function HomeProductsPage() {
  const sortType = 'CREATED_AT';
  const first = 40;
  const initialFilter = { category: 'Candle' };

  return (
    <div className="container mx-auto p-4">
      <ProductDisplay
        pageTitle="Candles"
        sortType={sortType}
        first={first}
        filter={initialFilter}
      />
    </div>
  );
}
