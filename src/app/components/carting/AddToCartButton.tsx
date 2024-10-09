'use client';

import { addItemToCart, createCart } from '@/app/utils/shopify';
import { AddToCartButtonProps } from '@/types/types';
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function AddToCartButton({
  variantId,
  quantity,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = async () => {
    if (!variantId || quantity <= 0) {
      console.error('Variant ID or quantity is missing/invalid.');
      return;
    }

    setIsAdding(true);

    try {
      let cartId = Cookies.get('shopify_cart_id');

      if (!cartId) {
        const newCart = await createCart(variantId, quantity);
        cartId = newCart.id;
        Cookies.set('shopify_cart_id', newCart.id, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        });
      }

      await addItemToCart(cartId, variantId, quantity);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="self-start border-2 border-gray-900 px-4 py-1 uppercase transition duration-200 ease-in hover:bg-gray-900 hover:text-white focus:outline-none"
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>

      {showPopup && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-gray-800 p-4 text-white shadow-lg">
          Cart Updated!
        </div>
      )}
    </div>
  );
}
