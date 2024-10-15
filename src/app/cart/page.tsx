'use client';

import { useState, useEffect } from 'react';
import { createCheckout, retrieveCart, updateCartItem } from '../utils/shopify';
import { Cart } from '@/types/types';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      const cartId = Cookies.get('shopify_cart_id');
      if (cartId) {
        const cartData = await retrieveCart(cartId);
        setCart(cartData);
        setCartEmpty(cartData.lines.edges.length === 0);
      } else {
        setCartEmpty(true);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityUpdate = async (lineId: string, newQuantity: number) => {
    const cartId = Cookies.get('shopify_cart_id');
    if (cartId) {
      try {
        const updatedCart = await updateCartItem(cartId, lineId, newQuantity);
        setCart(updatedCart);
        setCartEmpty(updatedCart.lines.edges.length === 0);
      } catch (error) {
        console.error('Error updating cart item:', error);
      }
    }
  };

  const handleCheckout = async () => {
    if (!cart) return;

    try {
      // Map the cart items to the correct structure for the mutation
      const lineItems = cart.lines.edges
        .map((line) => {
          const variantId = line.node.merchandise.id; // Extract the variantId
          const quantity = line.node.quantity; // Extract the quantity

          if (!variantId) {
            console.error('Error: Variant ID is missing for a line item.');
            return null;
          }

          return {
            variantId, // Ensure the variantId is not null
            quantity,
          };
        })
        .filter((item) => item !== null); // Remove any null items from the array

      if (lineItems.length === 0) {
        throw new Error('No valid line items available for checkout.');
      }

      // Create checkout and redirect to Shopify checkout page
      const checkoutUrl = await createCheckout(lineItems);
      window.location.href = checkoutUrl; // Redirect user to checkout URL
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* for testing purposes */}
      <div className="render cart here">
        <pre>{JSON.stringify(cart, null, 2)}</pre>
      </div>
      {cart ? (
        cartEmpty ? (
          <div>
            <h1 className="my-6 text-2xl font-bold">Your cart is empty</h1>
            <Link
              href="/all"
              className="inline-block text-blue-500 hover:text-blue-700"
            >
              Shop our new arrivals
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="my-6 text-2xl font-bold">Your cart</h1>
            <div className="mb-8 space-y-4">
              {cart.lines.edges.map((line) => (
                <div
                  key={line.node.id}
                  className="flex items-center justify-between rounded-md border p-4"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      {line.node.merchandise.product.title}{' '}
                      {line.node.merchandise.title}
                    </h2>
                    <div>
                      <img
                        src={line.node.merchandise.product.featuredImage.url}
                        alt={
                          line.node.merchandise.product.featuredImage.altText ||
                          'Product image'
                        }
                        className="h-full max-h-24 w-full max-w-24 rounded-lg object-contain shadow-md"
                      />
                    </div>

                    <p>
                      Price: ${line.node.merchandise.priceV2?.amount || '0.00'}{' '}
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
                <span>
                  Subtotal: {cart.estimatedCost?.totalAmount?.amount}{' '}
                </span>
              </div>
              <div className="mb-4">
                <span>
                  Shipping, taxes, and discounts calculated at checkout.
                </span>
              </div>
              <div className="mb-8 inline-block rounded border">
                <button className="px-4 py-2" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        <p>Loading cart...</p>
      )}
    </div>
  );
}
