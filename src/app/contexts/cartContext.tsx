'use client';

import { CartContextType, CartItem, CartState } from '@/types/types';
import { createContext, ReactNode, useContext, useReducer } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const { quantity: quantitySelected } = action.payload;

      let updatedItems = [...state.items];

      // If item exists, update its quantity
      if (existingItemIndex > -1) {
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantitySelected,
        };
      } else {
        // Add new item to the cart
        updatedItems.push({
          ...action.payload,
          quantity: quantitySelected,
        });
      }

      const updatedTotalQuantity = state.totalQuantity + quantitySelected;
      const updatedTotalPrice =
        state.totalPrice + action.payload.price * quantitySelected;

      return {
        ...state,
        items: updatedItems,
        totalQuantity: updatedTotalQuantity,
        totalPrice: updatedTotalPrice,
      };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      const removedItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (!removedItem) return state; // Item not found

      const updatedTotalQuantity = state.totalQuantity - removedItem.quantity;
      const updatedTotalPrice =
        state.totalPrice - removedItem.price * removedItem.quantity;

      return {
        ...state,
        items: updatedItems,
        totalQuantity: updatedTotalQuantity,
        totalPrice: updatedTotalPrice,
      };
    }
    case 'CLEAR_CART': {
      return { items: [], totalQuantity: 0, totalPrice: 0 };
    }
    default:
      throw new Error('Unhandled action type');
  }
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addCartItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeCartItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ cart, addCartItem, removeCartItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
