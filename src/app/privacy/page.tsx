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
    rights,
    contact,
  } = privacyData;

  return (
    <div className="container mx-auto max-w-3xl p-16">
      <h1 className="mt-6 text-center text-2xl font-bold">{title}</h1>
      <p className="mt-1 text-center text-sm text-gray-500">
        Last updated: {lastUpdated}
      </p>

      <section className="mt-4">
        <h2 className="font-bold">Privacy Policy</h2>
        <p>{introduction.content}</p>
        <p className="mt-4">{acceptance.content}</p>
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
        <h2 className="font-bold">{rights.title}</h2>
        <p>
          Depending on your location, you may have the right to access, correct,
          update, or delete the personal information we collect about you. To
          exercise these rights, please contact us at{' '}
          <a
            href="mailto:contact@scentsaver.co"
            className="underline hover:text-gray-600"
          >
            contact@scentsaver.co
          </a>
          . We will respond to your request in accordance with applicable data
          protection laws.
        </p>
      </section>

      <section className="mt-4">
        <h2 className="font-bold">{contact.title}</h2>
        <p>
          Should you have any questions about our privacy practices or this
          Privacy Policy, or if you would like to exercise any of the rights
          available to you, please email us at{' '}
          <a
            href="mailto:contact@scentsaver.co"
            className="underline hover:text-gray-600"
          >
            contact@scentsaver.co
          </a>
          .
        </p>
      </section>
    </div>
  );
}
