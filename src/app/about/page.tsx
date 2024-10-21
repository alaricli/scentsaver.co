import aboutData from '../../data/about.json';

export default async function AboutPage() {
  const { section1, section2 } = aboutData;

  return (
    <div className="container mx-auto px-16">
      <h1 className="my-6 text-center text-2xl font-bold">About Us</h1>
      <h2 className="font-bold">{section1.title}</h2>
      <p>{section1.content}</p>
      <h2 className="mt-4 font-bold">{section2.title}</h2>
      <p>{section2.content}</p>
    </div>
  );
}
