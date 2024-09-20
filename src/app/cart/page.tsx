'use client';

import { useCart } from '../contexts/cartContext';

export default async function CartPage() {
  const { cart } = useCart();

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-2xl font-bold">Cart</h1>

      {cart?.items.length > 0 ? (
        <div>
          {cart.items.map((item) => (
            <div key={item.id} className="mb-4">
              <h2>{item.title}</h2>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <div>
            <h3>Total Items: {cart.totalQuantity}</h3>
            <h3>Total Price: ${cart.totalPrice.toFixed(2)}</h3>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}
