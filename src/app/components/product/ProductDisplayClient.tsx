'use client';

import { Product } from '@/types/types';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';

export default function ProductDisplayClient({
  products, // Products array passed from the server-side component
  initialSortType, // Initial sort type passed from the server
  initialReverse, // Initial reverse sort order passed from the server
  filters,
}: {
  products: Product[];
  initialSortType: string;
  initialReverse: boolean;
  filters: {
    vendors: string[];
    productTypes: string[];
    variants: string[];
    minPrice: number;
    maxPrice: number;
  };
}) {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortType, setSortType] = useState(initialSortType);
  const [reverse, setReverse] = useState(initialReverse);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([
    filters.minPrice,
    filters.maxPrice,
  ]);

  const sortProducts = () => {
    const sorted = [...products].sort((a, b) => {
      // Sort by price: low - high
      if (sortType === 'PRICE:LOWTOHIGH') {
        const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
        const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
        return priceA - priceB;
      }

      if (sortType === 'PRICE:HIGHTOLOW') {
        const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
        const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
        return priceB - priceA;
      }

      // Sort alphabetically by title
      if (sortType === 'TITLE:ATOZ') {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA.localeCompare(titleB);
      }

      if (sortType === 'TITLE:ZTOA') {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleB.localeCompare(titleA);
      }

      // Default sort by creation date
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    setSortedProducts(sorted); // Update state with sorted products
  };

  // Trigger sorting whenever sortType or reverse state changes
  useEffect(() => {
    sortProducts();
  }, [sortType, reverse]);

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2">Sort By:</label>
        <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
          <option value="CREATED_AT">Newest</option>
          <option value="PRICE:LOWTOHIGH">Price: $ - $$$</option>
          <option value="PRICE:HIGHTOLOW">Price: $$$ - $</option>
          <option value="TITLE:ATOZ">Alphabetical: A - Z</option>
          <option value="TITLE:ZTOA">Alphabetical: Z - A</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {sortedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
