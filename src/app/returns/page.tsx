import returnData from '../../data/returns.json';

export default async function ReturnsPage() {
  const { section1, section2 } = returnData;

  return (
    <div className="container mx-auto max-w-3xl p-16">
      <h1 className="my-6 text-center text-2xl font-bold" id="page-title">
        Returns
      </h1>
      <main role="main">
        <section aria-labelledby="section1-title">
          <h2 id="section1-title" className="font-bold">
            {section1.title}
          </h2>
          <p>{section1.content}</p>
        </section>
        <section aria-labelledby="section2-title" className="mt-4">
          <h2 id="section2-title" className="font-bold">
            {section2.title}
          </h2>
          <p>
            If there is a mistake with your order or your order arrives damaged,
            please contact us at{' '}
            <a
              href="mailto:contact@scentsaver.co"
              className="underline hover:text-gray-600"
            >
              contact@scentsaver.co
            </a>{' '}
            within 7 days of receipt of your order and we will be more than
            happy to assist you.
          </p>
          <p className="text-sm italic" aria-live="polite" aria-atomic="true">
            {section2.footnote}
          </p>
        </section>
      </main>
    </div>
  );
}
