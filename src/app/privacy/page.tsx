import privacyData from '../../data/privacy.json';

export default function PrivacyPolicyPage() {
  const {
    title,
    lastUpdated,
    introduction,
    acceptance,
    changes,
    dataCollection,
    personalInformation,
    directCollection,
    cookies,
    thirdPartyCollection,
    usage,
    disclosure,
    contact,
  } = privacyData;

  return (
    <div className="container mx-auto px-16">
      <h1 className="my-6 text-center text-2xl font-bold">{title}</h1>
      <p className="text-center text-gray-500">Last updated: {lastUpdated}</p>

      <section className="mt-4">
        <p>{introduction.content}</p>
      </section>

      <section className="mt-4">
        <p>{acceptance.content}</p>
      </section>

      <section className="mt-4">
        <h2 className="font-bold">{changes.title}</h2>
        <p>{changes.content}</p>
      </section>

      <section className="mt-4">
        <h2 className="font-bold">{dataCollection.title}</h2>
        <p>{dataCollection.content}</p>
      </section>

      <section className="mt-4">
        <h2 className="font-bold">{personalInformation.title}</h2>
        <p>{personalInformation.content}</p>
      </section>

      <section className="mt-4">
        <h2 className="font-bold">{directCollection.title}</h2>
        <ul className="ml-6 list-disc">
          {directCollection.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="font-bold">{cookies.title}</h2>
        <p>{cookies.content}</p>
      </section>

      <section className="mt-4">
        <h2 className="font-bold">{thirdPartyCollection.title}</h2>
        <ul className="ml-6 list-disc">
          {thirdPartyCollection.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="font-bold">{usage.title}</h2>
        <ul className="ml-6 list-disc">
          {usage.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="font-bold">{disclosure.title}</h2>
        <ul className="ml-6 list-disc">
          {disclosure.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="font-bold">{contact.title}</h2>
        <p>{contact.content}</p>
      </section>
    </div>
  );
}
