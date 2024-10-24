'use client';

import { FC, useEffect, useState, useCallback } from 'react';
import { Product } from '@/types/types';
import { ProductFilter, CategoryOption, SortOption } from '@/types';
import ProductCard from './ProductCard';
import Newsletter from '../navigation/footer/Newsletter';
import { getProducts, getVendors } from '@/app/utils/shopify';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

const SORT_OPTIONS: SortOption[] = [
  { value: 'CREATED_AT', label: 'New Arrivals' },
  { value: 'PRICE:LOWTOHIGH', label: 'Price: $ - $$$' },
  { value: 'PRICE:HIGHTOLOW', label: 'Price: $$$ - $' },
  { value: 'TITLE:ATOZ', label: 'Alphabetically: A-Z' },
  { value: 'TITLE:ZTOA', label: 'Alphabetically: Z-A' },
];

const CATEGORIES: CategoryOption[] = [
  { name: 'All Products', value: '' },
  { name: 'Decants', value: 'Decant' },
  { name: 'Bottles', value: 'Bottle' },
  { name: 'Candles', value: 'Candle' },
  { name: 'Home Products', value: 'Home' },
  { name: 'Accessories', value: 'Accessory' },
];

interface FilterState {
  brand: string;
  category: string;
}

interface CollapseState {
  brand: boolean;
  category: boolean;
}

// Add this function before your component
function generateStructuredData(products: Product[], filters: FilterState) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        description: product.description || '',
        image: product.featuredImage?.url || '',
        url: `https://scentsaver.co/product/${product.handle}`,
        brand: {
          '@type': 'Brand',
          name: product.vendor,
        },
        offers: {
          '@type': 'Offer',
          price: product.priceRange.minVariantPrice.amount,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
}

const ProductsDisplay: FC<ProductsDisplayProps> = ({ initialFilter = {} }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vendors, setVendors] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState('CREATED_AT');

  const [filters, setFilters] = useState<FilterState>({
    brand: initialFilter.brand || '',
    category: initialFilter.category || '',
  });

  const [collapsed, setCollapsed] = useState<CollapseState>({
    brand: false,
    category: false,
  });

  const toggleSection = useCallback((section: keyof CollapseState) => {
    setCollapsed((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  const sortedVendors = vendors.sort((a, b) => a.localeCompare(b));
  const brands = ['All Brands', ...sortedVendors];

  const pageTitle = filters.category
    ? `Shop ${filters.category}`
    : 'All Products';

  const fetchVendors = useCallback(async () => {
    try {
      const vendorsList = await getVendors(filters.category);
      setVendors(vendorsList);
    } catch (error) {
      setError('Failed to load brands');
      console.error('Error fetching vendors:', error);
    }
  }, [filters.category]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const productsData = await getProducts({
        sortType,
        filter: {
          brand: filters.brand,
          category: filters.category,
        },
      });

      const productsList = productsData.edges.map(
        (edge: { node: Product }) => edge.node
      );
      setProducts(productsList);
      setSortedProducts(productsList);
    } catch (error) {
      setError('Failed to load products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortType]);

  const sortProducts = useCallback(() => {
    const sorted = [...products].sort((a, b) => {
      switch (sortType) {
        case 'PRICE:LOWTOHIGH':
          return (
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
          );
        case 'PRICE:HIGHTOLOW':
          return (
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
          );
        case 'TITLE:ATOZ':
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        case 'TITLE:ZTOA':
          return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
        case 'CREATED_AT':
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });
    setSortedProducts(sorted);
  }, [products, sortType]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    sortProducts();
  }, [sortProducts]);

  // In your component, add pathname
  const pathname = usePathname();

  // Add SEO title and description based on filters
  const seoTitle = filters.category
    ? `${filters.category} Products | scentsaver.co`
    : filters.brand
      ? `${filters.brand} Products | scentsaver.co`
      : 'All Products | scentsaver.co';

  const seoDescription = filters.category
    ? `Shop our collection of ${filters.category.toLowerCase()} products at scentsaver.co`
    : filters.brand
      ? `Explore ${filters.brand} fragrances and products at scentsaver.co`
      : 'Discover our complete collection of fragrances, decants, and accessories at scentsaver.co';

  // Add this before your main return statement
  const structuredData = generateStructuredData(sortedProducts, filters);

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />

        {/* OpenGraph tags */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://scentsaver.co${pathname}`} />
        <meta property="og:site_name" content="scentsaver.co" />

        {/* If you have a featured image for the collection */}
        <meta
          property="og:image"
          content="https://scentsaver.co/images/collection-og.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta
          name="twitter:image"
          content="https://scentsaver.co/images/collection-og.jpg"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://scentsaver.co${pathname}${
            filters.category ? `?category=${filters.category}` : ''
          }${filters.brand ? `?brand=${filters.brand}` : ''}`}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Additional meta tags for filters */}
        {filters.category && (
          <meta
            name="keywords"
            content={`${filters.category}, fragrances, scents, perfume, ${filters.brand || ''}`}
          />
        )}

        {/* If filtering is applied */}
        {(filters.category || filters.brand) && (
          <meta name="robots" content="noindex, follow" />
        )}
      </Head>

      <div className="w-full">
        <div
          className="grid grid-cols-4 gap-4 p-4"
          role="main"
          aria-label="Products section"
        >
          {/* Header Section */}
          <div className="col-span-2">
            <h1 className="text-2xl font-semibold">{pageTitle}</h1>
          </div>

          {/* Sort Controls */}
          <div className="col-span-2 flex items-center justify-end">
            <label htmlFor="sort-select" className="mr-2">
              Sort By:
            </label>
            <select
              id="sort-select"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
              className="border p-1"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filters Section */}
          <aside
            className="col-span-1 bg-gray-100 p-4"
            aria-label="Product filters"
          >
            <h2 className="mb-4 font-bold">Filter By</h2>

            {/* Brand Filter */}
            <div className="mb-4">
              <button
                onClick={() => toggleSection('brand')}
                className="flex w-full items-center justify-between bg-transparent p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={!collapsed.brand}
                aria-controls="brand-filter"
              >
                <h3 className="font-semibold">Brand</h3>
                <span aria-hidden="true">{collapsed.brand ? '+' : '-'}</span>
              </button>

              <div
                id="brand-filter"
                className={`space-y-1 ${collapsed.brand ? 'hidden' : ''}`}
                role="group"
                aria-label="Brand filters"
              >
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        brand: brand === 'All Brands' ? '' : brand,
                      }))
                    }
                    className={`block w-full border p-2 text-left transition ${
                      filters.brand === (brand === 'All Brands' ? '' : brand)
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-black hover:bg-blue-100'
                    }`}
                    aria-pressed={
                      filters.brand === (brand === 'All Brands' ? '' : brand)
                    }
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <button
                onClick={() => toggleSection('category')}
                className="flex w-full items-center justify-between bg-transparent p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={!collapsed.category}
                aria-controls="category-filter"
              >
                <h3 className="font-semibold">Category</h3>
                <span aria-hidden="true">{collapsed.category ? '+' : '-'}</span>
              </button>

              <div
                id="category-filter"
                className={`space-y-1 ${collapsed.category ? 'hidden' : ''}`}
                role="group"
                aria-label="Category filters"
              >
                {CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        category: category.value,
                      }))
                    }
                    className={`block w-full border p-2 text-left transition ${
                      filters.category === category.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-black hover:bg-blue-100'
                    }`}
                    aria-pressed={filters.category === category.value}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="col-span-3" role="region" aria-label="Products grid">
            {error ? (
              <div
                className="rounded-md bg-red-50 p-4 text-red-700"
                role="alert"
              >
                {error}
              </div>
            ) : loading ? (
              <div
                className="flex items-center justify-center py-10"
                role="status"
                aria-label="Loading products"
              >
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <span className="ml-2 text-lg font-medium">
                  Loading products...
                </span>
              </div>
            ) : sortedProducts.length > 0 ? (
              <div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                role="list"
              >
                {sortedProducts.map((product: Product) => (
                  <div key={product.id} role="listitem">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="py-10 text-center"
                role="status"
                aria-label="No products found"
              >
                <div className="mx-auto max-w-lg">
                  <p className="mb-6 text-xl font-semibold">
                    We'll have more products coming soon. Join our newsletter to
                    stay up to date with us!
                  </p>
                  <Newsletter bordered={true} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsDisplay;
