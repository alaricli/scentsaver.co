import { getProduct } from '@/app/utils/shopify';
import { Product, ProductPageProps } from '@/types/types';

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params;
  const shopifyId = `gid://shopify/Product/${productId}`;
  const response = await getProduct(shopifyId);
  const product: Product = response.product;

  if (!product) {
    return <div>Product not found</div>;
  }

  console.log(product);

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
      <div className="flex flex-col md:flex-row">
        {product.featuredImage && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || 'Product image'}
            className="mb-4 h-auto w-full object-cover md:w-1/2"
          />
        )}
        <div className="flex flex-col md:ml-6">
          <p className="mb-2 text-xl">
            Price: ${product.priceRange.minVariantPrice.amount}
          </p>
          <p className="mb-4 text-gray-700">{product.description}</p>

          <button className="rounded-full border-2 border-gray-900 px-6 py-2 uppercase transition duration-200 ease-in hover:bg-gray-800 hover:text-white focus:outline-none">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
