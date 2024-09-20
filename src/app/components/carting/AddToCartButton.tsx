'use client';

import { AddToCartButtonProps, CartItem } from '@/types/types';
import { useCart } from '../../contexts/cartContext';
import { useState } from 'react';

export default function AddToCartButton({
  product,
  variant,
  quantity,
}: AddToCartButtonProps) {
  const { addCartItem, cart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    if (!variant) {
      console.error('No variant available for this product.');
      return;
    }

    const cartItem: CartItem = {
      id: variant.id,
      title: product.title,
      price: parseFloat(variant.priceV2.amount),
      quantity: quantity,
    };

    setIsAdding(true);
    addCartItem(cartItem);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setIsAdding(false);
    }, 2000);
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
          Cart Updated! Total Items: {cart?.totalQuantity || 0}
        </div>
      )}
    </div>
  );
}
