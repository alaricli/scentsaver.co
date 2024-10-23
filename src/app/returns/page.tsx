import returnData from '../../data/returns.json';

export default async function ReturnsPage() {
  const { section1, section2 } = returnData;

  return (
    <div className="container mx-auto max-w-3xl p-16">
      <h1 className="my-6 text-center text-2xl font-bold">Returns</h1>
      <section className="mt-4">
        <div>
          <h2 className="font-bold">{section1.title}</h2>
          <p>{section1.content}</p>
        </div>
        <div className="mt-4">
          <h2 className="font-bold">{section2.title}</h2>
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
          <p className="text-sm italic">{section2.footnote}</p>
        </div>
      </section>
    </div>
  );
}
