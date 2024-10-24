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
      <h1 className="mt-6 text-center text-2xl font-bold" id="page-title">
        {title}
      </h1>
      <p
        className="mt-1 text-center text-sm text-gray-500"
        aria-live="polite"
        aria-atomic="true"
      >
        Last updated: {lastUpdated}
      </p>

      <main role="main">
        <section aria-labelledby="privacy-policy" className="mt-4">
          <h2 id="privacy-policy" className="font-bold">
            Privacy Policy
          </h2>
          <p>{introduction.content}</p>
          <p className="mt-4">{acceptance.content}</p>
        </section>

        <section aria-labelledby="policy-changes" className="mt-4">
          <h2 id="policy-changes" className="font-bold">
            {changes.title}
          </h2>
          <p>{changes.content}</p>
        </section>

        <section aria-labelledby="data-collection" className="mt-4">
          <h2 id="data-collection" className="font-bold">
            {dataCollection.title}
          </h2>
          <p>{dataCollection.content}</p>
        </section>

        <section aria-labelledby="personal-information" className="mt-4">
          <h2 id="personal-information" className="font-bold">
            {personalInformation.title}
          </h2>
          <p>{personalInformation.content}</p>
        </section>

        <section aria-labelledby="direct-collection" className="mt-4">
          <h2 id="direct-collection" className="font-bold">
            {directCollection.title}
          </h2>
          <ul className="ml-6 list-disc">
            {directCollection.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="cookies" className="mt-4">
          <h2 id="cookies" className="font-bold">
            {cookies.title}
          </h2>
          <p>{cookies.content}</p>
        </section>

        <section aria-labelledby="third-party-collection" className="mt-4">
          <h2 id="third-party-collection" className="font-bold">
            {thirdPartyCollection.title}
          </h2>
          <ul className="ml-6 list-disc">
            {thirdPartyCollection.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="usage" className="mt-4">
          <h2 id="usage" className="font-bold">
            {usage.title}
          </h2>
          <ul className="ml-6 list-disc">
            {usage.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="disclosure" className="mt-4">
          <h2 id="disclosure" className="font-bold">
            {disclosure.title}
          </h2>
          <ul className="ml-6 list-disc">
            {disclosure.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="rights" className="mt-4">
          <h2 id="rights" className="font-bold">
            {rights.title}
          </h2>
          <p>
            Depending on your location, you may have the right to access,
            correct, update, or delete the personal information we collect about
            you. To exercise these rights, please contact us at{' '}
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

        <section aria-labelledby="contact" className="mt-4">
          <h2 id="contact" className="font-bold">
            {contact.title}
          </h2>
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
      </main>
    </div>
  );
}
