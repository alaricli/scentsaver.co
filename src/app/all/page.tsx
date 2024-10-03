import ProductDisplay from '../components/product/ProductDisplay';

export default async function ShopAllPage() {
  const sortType = 'CREATED_AT';
  const first = 40;
  const filter = {};

  return (
    <div>
      <ProductDisplay
        pageTitle="All Products"
        sortType={sortType}
        first={first}
        filter={filter}
      />
    </div>
  );
}
