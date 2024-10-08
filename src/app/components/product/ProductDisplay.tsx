'use client';

import { Product } from '@/types/types';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { getProducts, getVendors } from '@/app/utils/shopify';

export default function ProductDisplayClient({
  initialFilter = {},
}: {
  initialFilter?: {
    brand?: string;
    category?: string;
  };
}) {
  const [vendors, setVendors] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortType, setSortType] = useState('CREATED_AT');
  const [selectedBrand, setSelectedBrand] = useState(initialFilter.brand || '');
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilter.category || ''
  );
  const [brandCollapsed, setBrandCollapsed] = useState(false);
  const [categoryCollapsed, setCategoryCollapsed] = useState(false);

  const toggleBrandCollapse = () => {
    setBrandCollapsed(!brandCollapsed);
  };

  const toggleCategoryCollapse = () => {
    setCategoryCollapsed(!categoryCollapsed);
  };

  const sortedVendors = vendors.slice().sort((a, b) => a.localeCompare(b));
  const brands = ['All Brands', ...sortedVendors];

  const categories = [
    { name: 'All Products', value: '' },
    { name: 'Decants', value: 'Decant' },
    { name: 'Bottles', value: 'Bottle' },
    { name: 'Candles', value: 'Candle' },
    { name: 'Home Products', value: 'Home' },
    { name: 'Accessories', value: 'Accessory' },
  ];

  const pageTitle = selectedCategory
    ? `Shop ${selectedCategory}`
    : 'All Products';

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendors = await getVendors(selectedCategory || '');
        setVendors(vendors);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    const filter = {
      brand: selectedBrand || '',
      category: selectedCategory || '',
    };

    try {
      const productsData = await getProducts({
        sortType,
        filter,
      });

      setProducts(productsData.edges.map((edge: any) => edge.node));
      setSortedProducts(productsData.edges.map((edge: any) => edge.node));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const sortProducts = () => {
    const sorted = [...products].sort((a, b) => {
      // Sort by price
      if (sortType === 'PRICE:LOWTOHIGH') {
        return (
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
        );
      }
      if (sortType === 'PRICE:HIGHTOLOW') {
        return (
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
        );
      }
      // Sort alphabetically by title
      if (sortType === 'TITLE:ATOZ') {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      if (sortType === 'TITLE:ZTOA') {
        return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
      }
      if (sortType === 'CREATED_AT') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      // Default sort by creation date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setSortedProducts(sorted); // Update state with sorted products
  };

  // Trigger fetching products on filters change
  useEffect(() => {
    fetchProducts();
  }, [selectedBrand, selectedCategory, sortType]);

  // Trigger sorting whenever sortType state changes
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-2">
        <h1 className="text-2xl font-semibold">{pageTitle}</h1>
      </div>

      <div className="col-span-2 flex items-center justify-end">
        <label className="mr-2">Sort By:</label>
        <select
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
          className="border p-1"
        >
          <option value="CREATED_AT">New Arrivals</option>
          <option value="PRICE:LOWTOHIGH">Price: $ - $$$</option>
          <option value="PRICE:HIGHTOLOW">Price: $$$ - $</option>
          <option value="TITLE:ATOZ">Alphabetically: A-Z</option>
          <option value="TITLE:ZTOA">Alphabetically: Z-A</option>
        </select>
      </div>

      <div className="col-span-1 bg-gray-100 p-4">
        <h3 className="mb-4 font-bold">Filter By</h3>

        {/* Brand Selector */}
        <div className="mb-4">
          <button
            onClick={toggleBrandCollapse}
            className="flex w-full appearance-none items-center justify-between border-none bg-transparent p-2 hover:bg-gray-100 focus:outline-none"
          >
            <h4 className="font-semibold">Brand</h4>
            <span>{brandCollapsed ? '+' : '-'}</span>
          </button>
          {!brandCollapsed && (
            <div>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() =>
                    setSelectedBrand(brand === 'All Brands' ? '' : brand)
                  }
                  className={`block w-full border p-2 text-left ${
                    selectedCategory === brand
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-black'
                  } transition hover:bg-blue-100`}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Selector */}
        <div className="mb-4">
          <button
            onClick={toggleCategoryCollapse}
            className="flex w-full appearance-none items-center justify-between border-none bg-transparent p-2 hover:bg-gray-100 focus:outline-none"
          >
            <h4 className="font-semibold">Category</h4>
            <span>{categoryCollapsed ? '+' : '-'}</span>
          </button>
          {!categoryCollapsed && (
            <div>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`block w-full border p-2 text-left ${
                    selectedCategory === category.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-black'
                  } transition hover:bg-blue-100`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="col-span-3">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {sortedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
