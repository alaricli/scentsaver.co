import ProductsDisplay from '@/app/components/product/ProductsDisplay';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { brand: string };
}) {
  const brand = decodeURIComponent(params.brand);

  return {
    title: `${brand} Products | scentsaver.co`,
    description: `Explore ${brand} fragrances and products at scentsaver.co`,
    openGraph: {
      title: `${brand} Products | scentsaver.co`,
      description: `Explore ${brand} fragrances and products at scentsaver.co`,
      type: 'website',
      url: `https://scentsaver.co/brand/${encodeURIComponent(brand)}`,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${brand} products at scentsaver.co`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand} Products | scentsaver.co`,
      description: `Explore ${brand} fragrances and products at scentsaver.co`,
    },
    alternates: {
      canonical: `https://scentsaver.co/brand/${encodeURIComponent(brand)}`,
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: { brand: string };
}) {
  const brand = await decodeURIComponent(params.brand);

  const initialFilter = {
    category: '',
    brand: brand,
  };

  return (
    <main className="w-full p-4" aria-labelledby="page-title">
      <ProductsDisplay initialFilter={initialFilter} />
    </main>
  );
}
