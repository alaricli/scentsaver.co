'use client';

import { useState, FC } from 'react';
import { addItemToCart, createCart } from '@/app/utils/shopify';
import { AddToCartButtonProps } from '@/types/types';
import Cookies from 'js-cookie';

interface AddToCartButtonState {
  isAdding: boolean;
  showPopup: boolean;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ variantId, quantity }) => {
  const [state, setState] = useState<AddToCartButtonState>({
    isAdding: false,
    showPopup: false,
  });

  const handleAddToCart = async () => {
    if (!variantId || quantity <= 0) {
      console.error('Variant ID or quantity is missing/invalid.');
      return;
    }

    setState((prevState) => ({ ...prevState, isAdding: true }));

    try {
      let cartId = Cookies.get('shopify_cart_id');

      if (!cartId) {
        const newCart = await createCart(variantId, quantity);
        cartId = newCart.id;
        Cookies.set('shopify_cart_id', newCart.id, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
          path: '/',
        });
      }

      await addItemToCart(cartId, variantId, quantity);
      setState((prevState) => ({ ...prevState, showPopup: true }));
      setTimeout(
        () => setState((prevState) => ({ ...prevState, showPopup: false })),
        2000
      );
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setState((prevState) => ({ ...prevState, isAdding: false }));
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="self-start border-2 border-gray-900 px-4 py-1 uppercase transition duration-200 ease-in hover:bg-gray-900 hover:text-white focus:outline-none"
        disabled={state.isAdding}
        aria-label={state.isAdding ? 'Adding item to cart' : 'Add to cart'}
      >
        {state.isAdding ? 'Adding...' : 'Add to Cart'}
      </button>

      {state.showPopup && (
        <div
          className="fixed bottom-4 right-4 rounded-lg bg-gray-800 p-4 text-white shadow-lg"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          Cart Updated!
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
