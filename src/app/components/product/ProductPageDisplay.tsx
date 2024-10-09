'use client';

// TODO: square image
// TODO: images carousel
// TODO: implement OOS
// TODO: fix atc incorrect quantity8

import { useState } from 'react';
import AddToCartButton from '../carting/AddToCartButton';
import { ProductCardProps } from '@/types/types';

const ProductPageDisplay: React.FC<ProductCardProps> = ({ product }) => {
  const firstVariant = product.variants.edges[0].node;
  const [selectedVariant, setSelectedVariant] = useState(firstVariant);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVariantId = e.target.value;
    const newVariant = product.variants.edges.find(
      (edge) => edge.node.id === selectedVariantId
    )?.node;
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold md:text-left">
        {product.title}
      </h1>
      <h2 className="text-l">{product.vendor}</h2>
      <div className="flex flex-col md:flex-row md:space-x-8">
        {product.featuredImage && (
          <div className="relative aspect-square w-full max-w-xs md:w-1/2">
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || 'Product image'}
              className="absolute left-0 top-0 h-full w-full rounded-lg object-contain shadow-md"
            />
          </div>
        )}
        <div className="flex flex-col md:ml-6">
          <label htmlFor="variant-selector" className="mb-2">
            Size:
          </label>
          <select
            id="variant-selector"
            value={selectedVariant.id}
            onChange={handleVariantChange}
            className="mb-4 w-48 rounded border p-2"
          >
            {product.variants.edges.map((variantEdge) => (
              <option key={variantEdge.node.id} value={variantEdge.node.id}>
                {variantEdge.node.title}
              </option>
            ))}
          </select>
          <label htmlFor="quantity-selector" className="mb-2">
            Quantity:
          </label>
          <select
            id="quantity-selector"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
            className="mb-4 w-48 rounded border p-2"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>

          <p className="mb-4 text-2xl font-semibold text-gray-800">
            Price: ${selectedVariant.priceV2.amount}{' '}
            {selectedVariant.priceV2.currencyCode}
          </p>

          <AddToCartButton
            product={product}
            variant={selectedVariant}
            quantity={selectedQuantity}
          />

          <p className="mb-6 mt-4 text-lg text-gray-700">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPageDisplay;
