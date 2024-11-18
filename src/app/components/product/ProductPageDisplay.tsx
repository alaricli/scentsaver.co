'use client';

import { useState, FC } from 'react';
import AddToCartButton from '../carting/AddToCartButton';
import { ProductCardProps } from '@/types/types';
import Link from 'next/link';
import Image from 'next/image';

const ProductPageDisplay: FC<ProductCardProps> = ({ product }) => {
  const firstVariant = product.variants.edges[0].node;
  const [selectedVariant, setSelectedVariant] = useState(firstVariant);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVariantId = e.target.value;
    const newVariant = product.variants.edges.find(
      (edge) => edge.node.id === selectedVariantId
    )?.node;
    if (newVariant) {
      setSelectedVariant(newVariant);
      setSelectedQuantity(1);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.edges.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.edges.length - 1 : prevIndex - 1
    );
  };

  const maxQuantity = Math.min(selectedVariant.quantityAvailable ?? 0, 10);
  const availableForSale = selectedVariant.availableForSale;
  const currentImage = product.images.edges[currentImageIndex]?.node;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold md:text-left">
        {product.title}
      </h1>
      <h2 className="text-l">
        <Link
          href={`/brand/${encodeURIComponent(product.vendor)}`}
          className="underline hover:text-gray-600"
        >
          {product.vendor}
        </Link>
      </h2>
      <div className="flex flex-col md:flex-row md:space-x-8">
        {currentImage && (
          <div className="relative h-96 w-full md:h-[500px] md:w-1/2">
            <Image
              src={currentImage.url}
              alt={currentImage.altText || 'Product image'}
              layout="fill"
              objectFit="contain"
              className="h-full w-full rounded-lg object-contain shadow-md"
            />
            <button
              onClick={handlePreviousImage}
              className="group absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-black/70 hover:bg-black/90 focus:outline-none"
              aria-label="Previous image"
            >
              <svg
                className="h-4 w-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="group absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-black/70 hover:bg-black/90 focus:outline-none"
              aria-label="Next image"
            >
              <svg
                className="h-4 w-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 9l4-4-4-4"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="flex flex-col md:w-1/2">
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

          <p className="mb-4 text-2xl font-semibold text-gray-800">
            Price: ${selectedVariant.priceV2.amount}{' '}
            {selectedVariant.priceV2.currencyCode}
          </p>
          {!availableForSale || maxQuantity === 0 ? (
            <button
              disabled
              className="self-start border-2 border-gray-900 px-4 py-1 uppercase transition duration-200 ease-in hover:bg-gray-900 hover:text-white focus:outline-none"
            >
              Out of Stock
            </button>
          ) : (
            <>
              <label htmlFor="quantity-selector" className="mb-2">
                Quantity:
              </label>
              <select
                id="quantity-selector"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                className="mb-4 w-48 rounded border p-2"
              >
                {[...Array(maxQuantity).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>

              {availableForSale && maxQuantity <= 5 && (
                <p className="mb-2 text-yellow-600">
                  Hurry! Only {maxQuantity} left in stock.
                </p>
              )}

              <AddToCartButton
                variantId={selectedVariant.id}
                quantity={selectedQuantity}
              />
            </>
          )}
          <p className="mb-4 mt-4 text-lg text-gray-700">
            {product.description}
          </p>
          {product.productType === 'Decant' && (
            <p className="italic">
              <strong>Please Note:</strong> The sample decants shown in the
              product images are for reference purposes only. You will receive
              the selected fragrance at the advertised quantity in a
              high-quality spray vial or spray bottle, but the vial design or
              label may slightly differ from those pictured.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPageDisplay;
