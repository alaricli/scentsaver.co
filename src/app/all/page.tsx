import { Metadata } from 'next';
import ProductsDisplay from '../components/product/ProductsDisplay';

interface PageProps {
  searchParams: {
    category?: string;
    brand?: string;
  };
}

// Dynamic metadata based on search params
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const category = searchParams.category;
  const brand = searchParams.brand;

  // Build title based on filters
  const title = category
    ? `${category} Products`
    : brand
      ? `${brand} Products`
      : 'All Products';

  // Build description based on filters
  const description = category
    ? `Shop our collection of ${category.toLowerCase()} products`
    : brand
      ? `Explore ${brand} fragrances and products`
      : 'Discover our complete collection of fragrances, decants, and accessories';

  return {
    title: `${title} | scentsaver.co`,
    description,
    openGraph: {
      title: `${title} | scentsaver.co`,
      description,
      type: 'website',
      url: 'https://scentsaver.co/all',
      images: [
        {
          url: '/images/og-image.jpg', // Add your OG image
          width: 1200,
          height: 630,
          alt: 'scentsaver.co products',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | scentsaver.co`,
      description,
    },
    alternates: {
      canonical: `https://scentsaver.co/all${
        category ? `?category=${category}` : ''
      }${brand ? `?brand=${brand}` : ''}`,
    },
  };
}

export default function ShopAllPage({ searchParams }: PageProps) {
  const initialFilter = {
    category: searchParams.category || '',
    brand: searchParams.brand || '',
  };

  return (
    <main className="w-full p-4" aria-labelledby="page-title">
      {/* Optional: Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: searchParams.category || searchParams.brand || 'All Products',
            description: 'Browse our collection of fragrances and accessories',
            url: `https://scentsaver.co/all${
              searchParams.category ? `?category=${searchParams.category}` : ''
            }${searchParams.brand ? `?brand=${searchParams.brand}` : ''}`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://scentsaver.co',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'All Products',
                  item: 'https://scentsaver.co/all',
                },
                ...(searchParams.category
                  ? [
                      {
                        '@type': 'ListItem',
                        position: 3,
                        name: searchParams.category,
                        item: `https://scentsaver.co/all?category=${searchParams.category}`,
                      },
                    ]
                  : []),
                ...(searchParams.brand
                  ? [
                      {
                        '@type': 'ListItem',
                        position: searchParams.category ? 4 : 3,
                        name: searchParams.brand,
                        item: `https://scentsaver.co/all?brand=${searchParams.brand}`,
                      },
                    ]
                  : []),
              ],
            },
          }),
        }}
      />
      <ProductsDisplay initialFilter={initialFilter} />
    </main>
  );
}
