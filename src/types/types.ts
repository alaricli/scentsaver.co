export interface Product {
  id: string;
  handle: string;
  title: string;
  description?: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  featuredImage?: {
    altText?: string;
    url: string;
  };
  variants: ProductVariantConnection;
  vendor: string;
}

export interface Edge {
  node: Product;
}

export interface ProductConnection {
  edges: Edge[];
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductPageProps {
  params: { productHandle: string };
}

export interface ProductVariantConnection {
  edges: ProductVariantEdge[];
}

export interface ProductVariantEdge {
  node: ProductVariant;
}

export type ProductVariant = {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  selectedOptions?: { name: string; value: string }[];
};

export type Cart = {
  id: string | undefined;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartItem[];
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
    totalTaxAmount: { amount: string; currencyCode: string };
  };
};

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export interface CartContextType {
  cart: CartState;
  addCartItem: (item: CartItem) => void;
  removeCartItem: (id: string) => void;
  clearCart: () => void;
}

export interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}
