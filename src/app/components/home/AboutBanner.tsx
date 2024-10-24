import { FC } from 'react';

interface ValueProposition {
  title: string;
  description: string;
}

const valuePropositions: ValueProposition[] = [
  {
    title: 'Big Savings',
    description:
      'Sample exclusive fragrances before committing to a full bottle or collect a variety of luxurious scents for amazingly low prices',
  },
  {
    title: '100% Authenticity Guaranteed',
    description:
      'Trustworthy and safe, we aim to deliver the highest quality decants from authentic retail bottles',
  },
  {
    title: 'Free Shipping',
    description: 'On orders over $99',
  },
];

const AboutBanner: FC = () => {
  return (
    <section
      className="w-full bg-gray-100 py-12"
      aria-labelledby="value-propositions-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="value-propositions-title"
          className="mb-8 text-center text-3xl font-semibold text-gray-900"
        >
          Why scentsaver.co?
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3" role="list">
          {valuePropositions.map((prop, index) => (
            <article
              key={index}
              className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:transform"
              role="listitem"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {prop.title}
              </h3>
              <p className="text-center text-gray-600">{prop.description}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Optional: Add schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'scentsaver.co',
            description: 'Premium fragrance decants and samples',
            offers: [
              {
                '@type': 'Offer',
                description: valuePropositions[0].description,
              },
              {
                '@type': 'Offer',
                description: valuePropositions[1].description,
              },
              {
                '@type': 'Offer',
                description: valuePropositions[2].description,
              },
            ],
          }),
        }}
      />
    </section>
  );
};

export default AboutBanner;
