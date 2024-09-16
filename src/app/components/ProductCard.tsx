import { ProductCardProps } from '@/types/types';
import Link from 'next/link';

export default function ProductCard({ product }: ProductCardProps) {
  const productId = product.id.split('/').pop();

  return (
    <Link href={`/product/${productId}`} passHref>
      <div className="max-w-xs overflow-hidden rounded bg-white p-4 shadow-lg">
        {product.featuredImage && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || 'Product image'}
            className="h-48 w-full object-cover"
          />
        )}
        <div className="px-6 py-4">
          <h2 className="mb-2 text-xl font-bold">{product.title}</h2>
          <p className="text-base text-gray-700">
            Starting at: ${product.priceRange.minVariantPrice.amount}
          </p>
        </div>
        <div>
          <button className="rounded-full border-2 border-gray-900 px-6 py-2 uppercase transition duration-200 ease-in hover:bg-gray-800 hover:text-white focus:outline-none">
            Add To Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
