import shippingData from '../../data/shipping.json';

export default async function ShippingPage() {
  const { section1 } = shippingData;

  return (
    <div className="container mx-auto p-16">
      <h1 className="my-6 text-center text-2xl font-bold">Shipping</h1>
      <h2 className="font-bold">{section1.title}</h2>
      <p>{section1.content1}</p>
      <p>{section1.content2}</p>
      <p>{section1.footnote}</p>
      <p>{section1.content3}</p>
    </div>
  );
}
