import ProductDisplay from '../components/product/ProductDisplay';

export default async function DecantsPage() {
  return (
    <div className="container mx-auto p-4">
      <ProductDisplay pageTitle="All Decants" displayType="Decant" />
    </div>
  );
}
