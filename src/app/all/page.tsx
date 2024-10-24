import { Metadata } from 'next';
import ProductsDisplay from '../components/product/ProductsDisplay';

export const metadata: Metadata = {
  title: 'All Products | scentsaver.co',
  description:
    'Discover our complete collection of fragrances, decants, and accessories',
  openGraph: {
    title: 'All Products | scentsaver.co',
    description:
      'Discover our complete collection of fragrances, decants, and accessories',
    type: 'website',
    url: 'https://scentsaver.co/all',
    images: [
      {
        url: '/images/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'scentsaver.co products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Products | scentsaver.co',
    description:
      'Discover our complete collection of fragrances, decants, and accessories',
  },
  alternates: {
    canonical: 'https://scentsaver.co/all',
  },
};

export default function ShopAllPage() {
  const initialFilter = {
    category: '',
    brand: '',
  };

  return (
    <main className="w-full p-4" aria-labelledby="page-title">
      <ProductsDisplay initialFilter={initialFilter} />
    </main>
  );
}
