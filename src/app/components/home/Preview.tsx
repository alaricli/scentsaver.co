'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/types';
import ProductCard from '../product/ProductCard';
import { getProducts } from '@/app/utils/shopify';

export default function Preview() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [maxDisplay, setMaxDisplay] = useState(5);

  const adjusMaxDisplay = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1536) {
      // xl:grid-cols-5
      setMaxDisplay(5);
    } else if (screenWidth >= 1280) {
      // lg:grid-cols-4
      setMaxDisplay(4);
    } else if (screenWidth >= 1024) {
      // lg:grid-cols-3
      setMaxDisplay(3);
    } else if (screenWidth >= 768) {
      // md:grid-cols-2
      setMaxDisplay(2);
    } else {
      // Default to 1 column for small screens
      setMaxDisplay(1);
    }
  };

  const fetchNewArrivals = async () => {
    try {
      setLoading(true);

      const productsData = await getProducts({
        sortType: 'CREATED_AT',
        filter: {},
        first: maxDisplay,
      });

      setProducts(productsData.edges.map((edge: any) => edge.node));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    adjusMaxDisplay();

    // Listen for screen resize to adjust the number of new arrivals dynamically
    window.addEventListener('resize', adjusMaxDisplay);

    return () => {
      window.removeEventListener('resize', adjusMaxDisplay);
    };
  }, []);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <div className="m-4 py-10">
      <h2 className="mb-6 text-center text-3xl font-semibold">
        Newest Arrivals
      </h2>
      {loading ? (
        <div className="text-center">Loading new arrivals...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
