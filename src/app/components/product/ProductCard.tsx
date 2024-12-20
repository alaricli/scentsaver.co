import { FC } from 'react';
import Link from 'next/link';
import { ProductCardProps } from '@/types/types';
import Image from 'next/image';

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const productHandle = product.handle;

  return (
    <Link
      href={`/product/${productHandle}`}
      passHref
      aria-label={`View product: ${product.title}`}
      className="flex h-full max-w-xs flex-col overflow-hidden rounded bg-white shadow-lg"
    >
      <div className="aspect-w-1 aspect-h-1 relative h-48 w-full">
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || 'Product image'}
            layout="fill"
            objectFit="contain"
            className="absolute left-0 top-0 h-full w-full object-contain p-2"
          />
        )}
      </div>
      <div className="flex-1 p-2 text-center">
        <h2 className="text-l font-bold">{product.title}</h2>
        <div className="text-base text-gray-700">
          <p>{product.vendor}</p>
          <p>{product.productType}</p>
          <p className="font-bold">
            Starting at: ${product.priceRange.minVariantPrice.amount}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
