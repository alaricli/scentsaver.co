// Common Types
export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText?: string;
};

export type Edge<T> = {
  node: T;
};

export type Connection<T> = {
  edges: Edge<T>[];
};

// Product Types
export interface Product {
  id: string;
  handle: string;
  title: string;
  description?: string;
  createdAt: Date;
  vendor: string;
  productType: string;
  priceRange: {
    minVariantPrice: Pick<Money, 'amount'>;
  };
  featuredImage?: Image;
  images: Connection<Image & { id: string }>;
  variants: Connection<ProductVariant>;
}

export interface ProductVariant {
  id: string;
  title: string;
  productType: string;
  price: Money;
  selectedOptions?: {
    name: string;
    value: string;
  }[];
  availableForSale: boolean;
  quantityAvailable?: number;
}

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

// Order Types
export interface Order {
  orderNumber: number;
  totalPriceV2: Money;
}

// Component Props Types
export interface ProductCardProps {
  product: Product;
}

export interface ProductPageProps {
  params: {
    productHandle: string;
  };
}

export interface AddToCartButtonProps {
  variantId: string;
  quantity: number;
}

export interface NewsletterProps {
  bordered?: boolean;
}

export interface TextSectionProps {
  title: string;
  content: string;
}

// Customer Types
export interface Address {
  id: string;
  address1: string | null;
  address2: string | null;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string | null;
}
