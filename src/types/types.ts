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
  priceV2: Money;
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

export interface CustomerData {
  defaultAddress: Address | null;
  orders: Order[];
}

export interface ValueProposition {
  title: string;
  description: string;
}

export interface CarouselItem {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
}

export interface FooterLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  icon: JSX.Element;
  label: string;
  hoverColor: string;
}

export interface BannerItem {
  text: string;
  link: string | null;
  ariaLabel?: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface CategoryOption {
  name: string;
  value: string;
}

export interface SortOption {
  value: string;
  label: string;
}
