import shippingData from '../../data/shipping.json';

export default function ShippingPage() {
  const { section1 } = shippingData;

  return (
    <div className="container mx-auto max-w-3xl p-16">
      <h1 className="my-6 text-center text-2xl font-bold" id="page-title">
        {section1.title}
      </h1>

      <main role="main">
        <section aria-labelledby="shipping-info">
          <h2 id="shipping-info" className="mb-4 text-xl font-bold">
            {section1.title}
          </h2>
          <p className="mb-4">{section1.content1}</p>
          <p className="mb-4">{section1.content2}</p>
          <p className="mb-4">{section1.content4}</p>
          <p
            className="mb-4 text-sm italic"
            aria-live="polite"
            aria-atomic="true"
          >
            {section1.footnote}
          </p>
          <p className="mt-4">{section1.content3}</p>
          <p className="mt-4">{section1.content5}</p>
        </section>
      </main>
    </div>
  );
}
