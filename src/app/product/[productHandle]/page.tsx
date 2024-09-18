import { getProductByHandle } from '@/app/utils/shopify';
import { Product, ProductPageProps } from '@/types/types';
import AddToCartButton from '@/app/components/carting/AddToCartButton';

export default async function ProductPage({ params }: ProductPageProps) {
  const { productHandle } = params;
  const response = await getProductByHandle(productHandle);
  const product: Product = response.product;

  console.log(product);

  if (!product) {
    return <div>Error: Product not found</div>;
  }

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
          <p className="mb-4 text-2xl font-semibold text-gray-800">
            Price: ${product.priceRange.minVariantPrice.amount}
          </p>
          <AddToCartButton product={product} />

          <p className="mb-6 text-lg text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
