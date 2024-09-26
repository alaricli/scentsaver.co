import { ProductCardProps } from '@/types/types';
import Link from 'next/link';

export default function ProductCard({ product }: ProductCardProps) {
  const productHandle = product.handle;

  return (
    <Link href={`/product/${productHandle}`} passHref>
      <div className="max-w-xs overflow-hidden rounded bg-white shadow-lg">
        <div className="relative h-64 w-full">
          {product.featuredImage && (
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || 'Product image'}
              className="absolute left-0 top-0 h-full w-full object-contain p-4"
            />
          )}
        </div>
        <div className="p-4 text-center">
          <h2 className="mb-2 text-xl font-bold">{product.title}</h2>
          <p className="text-base text-gray-700">
            Starting at: ${product.priceRange.minVariantPrice.amount}
          </p>
        </div>
      </div>
    </Link>
  );
}
