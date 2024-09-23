'use client';

import { useState, useEffect } from 'react';
import { retrieveCart, updateCartItem } from '../utils/shopify';

export default function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const cartId = localStorage.getItem('shopify_cart_id');
      if (cartId) {
        const cartData = await retrieveCart(cartId);
        setCart(cartData);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityUpdate = async (lineId: string, newQuantity: number) => {
    const cartId = localStorage.getItem('shopify_cart_id');
    if (cartId) {
      try {
        const updatedCart = await updateCartItem(cartId, lineId, newQuantity);
        setCart(updatedCart);
      } catch (error) {
        console.error('Error updating cart item:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-2xl font-bold">Cart</h1>
      {cart ? (
        <div>
          {/* <div className="render cart here">
            <pre>{JSON.stringify(cart, null, 2)}</pre>
          </div> */}
          <div className="mb-8 space-y-4">
            {cart.lines.edges.map((line) => (
              <div
                key={line.node.id}
                className="flex items-center justify-between rounded-md border p-4"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {line.node.merchandise.title}
                  </h2>

                  <p>
                    Price: ${line.node.merchandise.priceV2?.amount || 'N/A'}{' '}
                    {line.node.merchandise.priceV2?.currencyCode || 'N/A'}
                  </p>
                  <div className="flex items-center justify-between border">
                    <button
                      className="border px-2 py-1"
                      onClick={() =>
                        handleQuantityUpdate(
                          line.node.id,
                          line.node.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <p className="mx-2">{line.node.quantity}</p>
                    <button
                      className="border px-2 py-1"
                      onClick={() =>
                        handleQuantityUpdate(
                          line.node.id,
                          line.node.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => handleQuantityUpdate(line.node.id, 0)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div>
              <span>Subtotal: {cart.estimatedCost.totalAmount.amount} </span>
            </div>
            <div className="mb-4">
              <span>
                Shipping, taxes, and discounts calculated at checkout.
              </span>
            </div>
            <div className="mb-8 inline-block rounded border">
              <button className="px-4 py-2">Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading cart...</p>
      )}
    </div>
  );
}
