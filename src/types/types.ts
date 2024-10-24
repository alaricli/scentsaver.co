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
  images: {
    edges: {
      node: {
        id: string;
        url: string;
        altText?: string;
      };
    }[];
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
  productType: string;
  price: { amount: string; currencyCode: string };
  selectedOptions?: { name: string; value: string }[];
  availableForSale: boolean;
  quantityAvailable?: number;
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
      product: {
        id: string;
        title: string;
        featuredImage: {
          url: string;
          altText: string | null;
        };
      };
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
    edges: CartLine[];
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

export interface TextSectionProps {
  title: string;
  content: string;
}

export type TotalPriceV2 = {
  amount: string;
  currencyCode: string;
};

// Represents a single order node
export type Order = {
  orderNumber: number;
  totalPriceV2: TotalPriceV2;
};

// Represents an edge in the orders list
export type OrderEdge = {
  node: Order;
};

// Represents the orders data structure, which contains an array of edges
export type Orders = {
  edges: OrderEdge[];
};

export type Address = {
  id: string;
  address1: string | null;
  address2: string | null;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string | null;
};
