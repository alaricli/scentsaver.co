import termsData from '../../data/terms.json';

export default async function TermsPage() {
  const {
    overview,
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    section7,
    section8,
    section9,
    section10,
    section11,
    section12,
    section13,
    section14,
    section15,
    section16,
    section17,
    section18,
    section19,
    section20,
  } = termsData;

  return (
    <div className="container mx-auto p-16">
      <h1 className="my-6 text-center text-2xl font-bold">Terms of Use</h1>
      <h2 className="font-bold">{overview.title}</h2>
      <p>{overview.content}</p>
      <h2 className="mt-4 font-bold">{section1.title}</h2>
      <p>{section1.content}</p>
      <h2 className="mt-4 font-bold">{section2.title}</h2>
      <p>{section2.content}</p>
      <h2 className="mt-4 font-bold">{section2.title}</h2>
      <p>{section2.content}</p>
      <h2 className="mt-4 font-bold">{section3.title}</h2>
      <p>{section3.content}</p>
      <h2 className="mt-4 font-bold">{section4.title}</h2>
      <p>{section4.content}</p>
      <h2 className="mt-4 font-bold">{section5.title}</h2>
      <p>{section5.content}</p>
      <h2 className="mt-4 font-bold">{section6.title}</h2>
      <p>{section6.content}</p>
      <h2 className="mt-4 font-bold">{section7.title}</h2>
      <p>{section7.content}</p>
      <h2 className="mt-4 font-bold">{section8.title}</h2>
      <p>{section8.content}</p>
      <h2 className="mt-4 font-bold">{section9.title}</h2>
      <p>{section9.content}</p>
      <h2 className="mt-4 font-bold">{section10.title}</h2>
      <p>{section10.content}</p>
      <h2 className="mt-4 font-bold">{section11.title}</h2>
      <p>{section11.content}</p>
      <h2 className="mt-4 font-bold">{section12.title}</h2>
      <p>{section12.content}</p>
      <h2 className="mt-4 font-bold">{section13.title}</h2>
      <p>{section13.content}</p>
      <h2 className="mt-4 font-bold">{section14.title}</h2>
      <p>{section14.content}</p>
      <h2 className="mt-4 font-bold">{section15.title}</h2>
      <p>{section15.content}</p>
      <h2 className="mt-4 font-bold">{section16.title}</h2>
      <p>{section16.content}</p>
      <h2 className="mt-4 font-bold">{section17.title}</h2>
      <p>{section17.content}</p>
      <h2 className="mt-4 font-bold">{section18.title}</h2>
      <p>{section18.content}</p>
      <h2 className="mt-4 font-bold">{section19.title}</h2>
      <p>{section19.content}</p>
      <h2 className="mt-4 font-bold">{section20.title}</h2>
      <p>{section20.content}</p>
    </div>
  );
}
