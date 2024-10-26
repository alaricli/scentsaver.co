'use client';

import { useEffect, useState, useCallback } from 'react';
import { Product } from '@/types/types';
import ProductCard from '../product/ProductCard';
import { getProducts } from '@/app/utils/shopify';

const BREAKPOINTS = {
  '2xl': 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
} as const;

export default function Preview() {
  const [state, setState] = useState<{
    products: Product[];
    loading: boolean;
    error: string | null;
  }>({
    products: [],
    loading: true,
    error: null,
  });
  const [maxDisplay, setMaxDisplay] = useState(5);

  // Debounce resize handler to improve performance
  const adjustMaxDisplay = useCallback(() => {
    const screenWidth = window.innerWidth;

    const newMaxDisplay =
      screenWidth >= BREAKPOINTS['2xl']
        ? 5
        : screenWidth >= BREAKPOINTS.xl
          ? 4
          : screenWidth >= BREAKPOINTS.lg
            ? 3
            : screenWidth >= BREAKPOINTS.md
              ? 2
              : 1;

    setMaxDisplay(newMaxDisplay);
  }, []);

  const fetchNewArrivals = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const productsData = await getProducts({
        sortType: 'CREATED_AT',
        filter: {},
        first: maxDisplay,
      });

      setState({
        products: productsData.edges.map(
          (edge: { node: Product }) => edge.node
        ),
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to load new arrivals. Please try again later.',
      }));
    }
  }, [maxDisplay]);

  // Handle resize events
  useEffect(() => {
    adjustMaxDisplay(); // Initial call to set display based on current screen width
    window.addEventListener('resize', adjustMaxDisplay);

    return () => {
      window.removeEventListener('resize', adjustMaxDisplay);
    };
  }, [adjustMaxDisplay]);

  // Fetch products when maxDisplay changes
  useEffect(() => {
    fetchNewArrivals();
  }, [fetchNewArrivals]);

  return (
    <section className="m-4 py-10" aria-labelledby="new-arrivals-title">
      <h2
        id="new-arrivals-title"
        className="mb-6 text-center text-3xl font-semibold"
      >
        Newest Arrivals
      </h2>

      {state.error ? (
        <div
          role="alert"
          className="rounded-md bg-red-50 p-4 text-center text-red-600"
        >
          {state.error}
          <button
            onClick={fetchNewArrivals}
            className="ml-2 underline hover:text-red-700"
            aria-label="Retry loading new arrivals"
          >
            Retry
          </button>
        </div>
      ) : state.loading ? (
        <div
          role="status"
          className="flex min-h-[200px] items-center justify-center"
          aria-label="Loading new arrivals"
        >
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-48 rounded bg-gray-200"></div>
            <div className="h-4 w-64 rounded bg-gray-200"></div>
            <div className="h-4 w-52 rounded bg-gray-200"></div>
          </div>
          <span className="sr-only">Loading new arrivals...</span>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          role="list"
          aria-label="New arrivals product grid"
        >
          {state.products.map((product: Product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Optional: Add schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: state.products.map((product, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                name: product.title,
                description: product.description,
                image: product.featuredImage?.url,
                offers: {
                  '@type': 'Offer',
                  price: product.priceRange.minVariantPrice.amount,
                },
              },
            })),
          }),
        }}
      />
    </section>
  );
}
