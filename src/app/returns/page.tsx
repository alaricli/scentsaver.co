import returnData from '../../data/returns.json';

export default async function ReturnsPage() {
  const { section1, section2 } = returnData;

  return (
    <div className="container mx-auto px-16">
      <h1 className="my-6 text-center text-2xl font-bold">Returns</h1>
      <h2 className="font-bold">{section1.title}</h2>
      <p>{section1.content}</p>
      <h2 className="font-bold">{section2.title}</h2>
      <p>{section2.content}</p>
      <p>{section2.footnote}</p>
    </div>
  );
}
