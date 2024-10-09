export interface Product {
  id: string;
  handle: string;
  title: string;
  description?: string;
  createdAt: Date;
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
  productType: string;
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
  variantId: string;
  quantity: number;
}

export interface CartLine {
  node: {
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      title: string;
      priceV2: {
        amount: string;
        currencyCode: string;
      };
    };
  };
}

export interface Cart {
  id: string;
  lines: {
    edges: CartLineItem[];
  };
  estimatedCost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface NewsletterProps {
  bordered?: boolean;
}
