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

export interface ProductConnection {
  edges: Edge[];
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductPageProps {
  params: { productId: string };
}
