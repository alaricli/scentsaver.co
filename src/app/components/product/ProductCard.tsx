import { ProductCardProps } from '@/types/types';
import Link from 'next/link';

export default function ProductCard({ product }: ProductCardProps) {
  const productHandle = product.handle;

  return (
    <Link href={`/product/${productHandle}`} passHref>
      <div className="h-full max-w-xs overflow-hidden rounded bg-white shadow-lg">
        <div className="aspect-w-1 aspect-h-1 relative h-48 w-full">
          {product.featuredImage && (
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || 'Product image'}
              className="absolute left-0 top-0 h-full w-full object-contain p-2"
            />
          )}
        </div>
        <div className="p-2 text-center">
          <h2 className="text-l font-bold">{product.title}</h2>
          <div className="text-base text-gray-700">
            <p>{product.vendor}</p>
            <p>{product.productType}</p>
            <p className="font-bold">
              Starting at: ${product.priceRange.minVariantPrice.amount}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
