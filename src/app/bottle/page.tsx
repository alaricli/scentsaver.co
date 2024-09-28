import ProductDisplay from '../components/product/ProductDisplay';

export default async function BottlesPage() {
  return (
    <div className="container mx-auto p-4">
      <ProductDisplay pageTitle="All Bottles" displayType="Bottle" />
    </div>
  );
}
