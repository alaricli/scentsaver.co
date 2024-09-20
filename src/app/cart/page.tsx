'use client';

import { useCart } from '../components/carting/cartContext';

export default async function CartPage() {
  const { cart } = useCart();

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="my-6 text-2xl font-bold">CartPage</h1>
        <p>CartPage Body</p>
      </div>
    </>
  );
}
