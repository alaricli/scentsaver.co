import { getProducts } from '../utils/shopify';
// export const getServerSideProps = async () => {
//   const data = await getProducts();
//   return {
//     props: { data },
//   };
// };

export default function BottlesPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-2xl font-bold">Bottles</h1>
      <p>Bottles Coming Soon</p>
    </div>
  );
}
