'use client';

import { FC, useState, useEffect } from 'react';
import { createCheckout, retrieveCart, updateCartItem } from '../utils/shopify';
import { Cart } from '@/types/types';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Image from 'next/image';

const CartPage: FC = () => {
  const [state, setState] = useState<{
    cart: Cart | null;
    cartEmpty: boolean;
    isLoading: boolean;
    error: string | null;
  }>({
    cart: null,
    cartEmpty: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCart = async () => {
      const cartId = Cookies.get('shopify_cart_id');

      try {
        if (cartId) {
          const cartData = await retrieveCart(cartId);
          setState((prev) => ({
            ...prev,
            cart: cartData,
            cartEmpty: cartData.lines.edges.length === 0,
            isLoading: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            cartEmpty: true,
            isLoading: false,
          }));
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: 'Failed to load cart',
          isLoading: false,
        }));
      }
    };

    fetchCart();
  }, []);

  const handleQuantityUpdate = async (lineId: string, newQuantity: number) => {
    const cartId = Cookies.get('shopify_cart_id');
    if (!cartId) return;

    try {
      const updatedCart = await updateCartItem(cartId, lineId, newQuantity);
      setState((prev) => ({
        ...prev,
        cart: updatedCart,
        cartEmpty: updatedCart.lines.edges.length === 0,
      }));
    } catch (error) {
      console.error('Error updating cart item:', error);
      setState((prev) => ({
        ...prev,
        error: 'Failed to update cart item',
      }));
    }
  };

  const handleCheckout = async () => {
    if (!state.cart) return;

    try {
      const lineItems = state.cart.lines.edges
        .map((line) => ({
          variantId: line.node.merchandise.id,
          quantity: line.node.quantity,
        }))
        .filter((item): item is { variantId: string; quantity: number } =>
          Boolean(item.variantId)
        );

      if (lineItems.length === 0) {
        throw new Error('No valid items available for checkout.');
      }

      const checkoutUrl = await createCheckout(lineItems);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      setState((prev) => ({
        ...prev,
        error: 'Failed to create checkout',
      }));
    }
  };

  if (state.isLoading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        role="status"
        aria-label="Loading cart"
      >
        <p className="text-lg">Loading cart...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8" aria-label="Shopping Cart">
      {state.error && (
        <div
          role="alert"
          className="mb-4 rounded-md bg-red-50 p-4 text-red-700"
        >
          {state.error}
        </div>
      )}

      {state.cart ? (
        state.cartEmpty ? (
          <div className="text-center">
            <h1 className="mb-6 text-2xl font-bold">Your cart is empty</h1>
            <Link
              href="/all"
              className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              Shop our new arrivals
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="mb-8 text-2xl font-bold">Your cart</h1>
            <div className="mb-8 space-y-4">
              {state.cart.lines.edges.map((line) => (
                <div
                  key={line.node.id}
                  className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
                    <div className="relative h-32 w-32 flex-shrink-0">
                      <Image
                        src={line.node.merchandise.product.featuredImage.url}
                        alt={
                          line.node.merchandise.product.featuredImage.altText ||
                          'Product image'
                        }
                        layout="fill"
                        objectFit="contain"
                        className="h-full w-full rounded-md object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col space-y-3">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {line.node.merchandise.product.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {line.node.merchandise.title}
                        </p>
                      </div>

                      <p className="font-medium text-gray-900">
                        ${line.node.merchandise.priceV2?.amount || '0.00'}{' '}
                        {line.node.merchandise.priceV2?.currencyCode || 'N/A'}
                      </p>

                      <div className="flex items-center space-x-4">
                        <div className="inline-flex items-center rounded-md border border-gray-300">
                          <button
                            className="px-3 py-1 text-gray-600 transition-colors hover:bg-gray-100"
                            onClick={() =>
                              handleQuantityUpdate(
                                line.node.id,
                                line.node.quantity - 1
                              )
                            }
                            aria-label="Decrease quantity"
                            disabled={line.node.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-1">
                            {line.node.quantity}
                          </span>
                          <button
                            className="px-3 py-1 text-gray-600 transition-colors hover:bg-gray-100"
                            onClick={() =>
                              handleQuantityUpdate(
                                line.node.id,
                                line.node.quantity + 1
                              )
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleQuantityUpdate(line.node.id, 0)}
                          className="text-sm text-red-600 transition-colors hover:text-red-700"
                          aria-label={`Remove ${line.node.merchandise.product.title} from cart`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg bg-gray-50 p-6">
              <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="text-lg font-medium">Subtotal</span>
                <span className="text-xl font-semibold">
                  ${state.cart.estimatedCost?.totalAmount?.amount}
                </span>
              </div>

              <p className="mb-6 text-sm text-gray-600">
                Shipping, taxes, and discounts calculated at checkout.
              </p>

              <button
                onClick={handleCheckout}
                className="w-full rounded-md bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )
      ) : (
        <div
          role="status"
          className="flex min-h-[60vh] items-center justify-center"
        >
          <p className="text-lg">Loading cart...</p>
        </div>
      )}
    </main>
  );
};

export default CartPage;
