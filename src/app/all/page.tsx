import ProductDisplay from '../components/product/ProductDisplay';

export default async function ShopAllPage() {
  const initialFilter = {};

  return (
    <div className="w-full p-4">
      <ProductDisplay initialFilter={initialFilter} />
    </div>
  );
}
