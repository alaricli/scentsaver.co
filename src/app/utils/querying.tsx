import { Product } from '@/types/types';

export function sortProducts(products: Product[], sortType: string): Product[] {
  return [...products].sort((a, b) => {
    // Sort by price: low to high
    if (sortType === 'PRICE:LOWTOHIGH') {
      return (
        parseFloat(a.priceRange.minVariantPrice.amount) -
        parseFloat(b.priceRange.minVariantPrice.amount)
      );
    }
    // Sort by price: high to low
    if (sortType === 'PRICE:HIGHTOLOW') {
      return (
        parseFloat(b.priceRange.minVariantPrice.amount) -
        parseFloat(a.priceRange.minVariantPrice.amount)
      );
    }
    // Sort by title A to Z
    if (sortType === 'TITLE:ATOZ') {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    }
    // Sort by title Z to A
    if (sortType === 'TITLE:ZTOA') {
      return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
    }
    // Default sort by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
