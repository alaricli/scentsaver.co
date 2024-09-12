export interface Product {
  id: string;
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
}

export interface Edge {
  node: Product;
}
