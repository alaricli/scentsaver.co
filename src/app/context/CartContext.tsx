'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { retrieveCart } from '../utils/shopify';
import { Cart, CartLine } from '@/types/types';

const CartContext = createContext<{
  cart: Cart | null;
  totalQuantity: number;
  fetchCart: () => Promise<void>;
}>({
  cart: null,
  totalQuantity: 0,
  fetchCart: async () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const fetchCart = async () => {
    const cartId = Cookies.get('shopify_cart_id');
    if (cartId) {
      const cartData = await retrieveCart(cartId);
      setCart(cartData);

      // Calculate the total quantity
      const total = cartData.lines.edges.reduce(
        (sum: number, line: CartLine) => sum + line.node.quantity,
        0
      );
      setTotalQuantity(total);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, totalQuantity, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}
