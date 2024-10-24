import Link from 'next/link';
import termsData from '../../data/terms.json';

export default async function TermsPage() {
  const {
    lastUpdated,
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
    <div className="container mx-auto max-w-3xl p-16">
      <h1 className="my-6 text-center text-2xl font-bold" id="page-title">
        Terms of Use
      </h1>
      <p
        className="text-center text-gray-500"
        aria-live="polite"
        aria-atomic="true"
      >
        Last updated: {lastUpdated}
      </p>
      <main role="main">
        <section aria-labelledby="overview">
          <h2 id="overview" className="font-bold">
            {overview.title}
          </h2>
          <p>{overview.content}</p>
        </section>

        <section aria-labelledby="section1">
          <h2 id="section1" className="mt-4 font-bold">
            {section1.title}
          </h2>
          <p>{section1.content}</p>
        </section>

        <section aria-labelledby="section2">
          <h2 id="section2" className="mt-4 font-bold">
            {section2.title}
          </h2>
          <p>{section2.content}</p>
        </section>

        <section aria-labelledby="section3">
          <h2 id="section3" className="mt-4 font-bold">
            {section3.title}
          </h2>
          <p>{section3.content}</p>
        </section>

        <section aria-labelledby="section4">
          <h2 id="section4" className="mt-4 font-bold">
            {section4.title}
          </h2>
          <p>{section4.content}</p>
        </section>

        <section aria-labelledby="section5">
          <h2 id="section5" className="mt-4 font-bold">
            {section5.title}
          </h2>
          <p>
            Certain products or Services may be available exclusively online
            through the website. These products or Services may have limited
            quantities and are subject to return or exchange only according to
            our Return Policy. To view our Return Policy, please visit{' '}
            <Link href="/returns" className="underline hover:text-gray-600">
              here
            </Link>
            . We have made every effort to display as accurately as possible the
            colors and images of our products that appear at the store. We
            cannot guarantee that your computer monitor's display of any color
            will be accurate. We reserve the right, but are not obligated, to
            limit the sales of our products or Services to any person,
            geographic region or jurisdiction. We may exercise this right on a
            case-by-case basis. We reserve the right to limit the quantities of
            any products or Services that we offer. All descriptions of products
            or product pricing are subject to change at anytime without notice,
            at the sole discretion of us. We reserve the right to discontinue
            any product at any time. Any offer for any product or service made
            on this site is void where prohibited. We do not warrant that the
            quality of any products, Services, information, or other material
            purchased or obtained by you will meet your expectations, or that
            any errors in the Service will be corrected.
          </p>
        </section>

        <section aria-labelledby="section6">
          <h2 id="section6" className="mt-4 font-bold">
            {section6.title}
          </h2>
          <p>
            We reserve the right to refuse any order you place with us. We may,
            in our sole discretion, limit or cancel quantities purchased per
            person, per household or per order. These restrictions may include
            orders placed by or under the same customer account, the same credit
            card, and/or orders that use the same billing and/or shipping
            address. In the event that we make a change to or cancel an order,
            we may attempt to notify you by contacting the e-mail and/or billing
            address/phone number provided at the time the order was made. We
            reserve the right to limit or prohibit orders that, in our sole
            judgment, appear to be placed by dealers, resellers or distributors.
            You agree to provide current, complete and accurate purchase and
            account information for all purchases made at our store. You agree
            to promptly update your account and other information, including
            your email address and credit card numbers and expiration dates, so
            that we can complete your transactions and contact you as needed.
            For more detail, please review our{' '}
            <Link href="/returns" className="underline hover:text-gray-600">
              Returns Policy
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="section7">
          <h2 id="section7" className="mt-4 font-bold">
            {section7.title}
          </h2>
          <p>{section7.content}</p>
        </section>

        <section aria-labelledby="section8">
          <h2 id="section8" className="mt-4 font-bold">
            {section8.title}
          </h2>
          <p>{section8.content}</p>
        </section>

        <section aria-labelledby="section9">
          <h2 id="section9" className="mt-4 font-bold">
            {section9.title}
          </h2>
          <p>{section9.content}</p>
        </section>

        <section aria-labelledby="section10">
          <h2 id="section10" className="mt-4 font-bold">
            {section10.title}
          </h2>
          <p>
            Your submission of personal information through the store is
            governed by our Privacy Policy. To view our Privacy Policy, please
            click{' '}
            <Link href="/privacy" className="underline hover:text-gray-600">
              here
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="section11">
          <h2 id="section11" className="mt-4 font-bold">
            {section11.title}
          </h2>
          <p>{section11.content}</p>
        </section>

        <section aria-labelledby="section12">
          <h2 id="section12" className="mt-4 font-bold">
            {section12.title}
          </h2>
          <div className="space-y-4">
            <p>
              In addition to other prohibitions as set forth in the Terms of
              Service, you are prohibited from using the site or its content:
            </p>
            <div className="space-y-2 pl-6">
              <div className="flex">
                <span className="mr-2">(a)</span>
                <p>for any unlawful purpose;</p>
              </div>
              <div className="flex">
                <span className="mr-2">(b)</span>
                <p>
                  to solicit others to perform or participate in any unlawful
                  acts;
                </p>
              </div>
              <div className="flex">
                <span className="mr-2">(c)</span>
                <p>
                  to violate any international, federal, provincial or state
                  regulations, rules, laws, or local ordinances;
                </p>
              </div>
              <div className="flex">
                <span className="mr-2">(d)</span>
                <p>
                  to infringe upon or violate our intellectual property rights
                  or the intellectual property rights of others;
                </p>
              </div>
              <div className="flex">
                <span className="mr-2">(e)</span>
                <p>
                  to harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate based on gender, sexual
                  orientation, religion, ethnicity, race, age, national origin,
                  or disability;
                </p>
              </div>
              <div className="flex">
                <span className="mr-2">(f)</span>
                <p>to submit false or misleading information;</p>
              </div>
              <div className="flex">
                <span className="mr-2">(g)</span>
                <p>
                  to upload or transmit viruses or any other type of malicious
                  code that will or may be used in any way that will affect the
                  functionality or operation of the Service or of any related
                  website, other websites, or the Internet;
                </p>
              </div>
              <div className="flex">
                <span className="mr-2">(h)</span>
                <p>to collect or track the personal information of others;</p>
              </div>
              <div className="flex">
                <span className="mr-2">(i)</span>
                <p>to spam, phish, pharm, pretext, spider, crawl, or scrape;</p>
              </div>
              <div className="flex">
                <span className="mr-2">(j)</span>
                <p>for any obscene or immoral purpose;</p>
              </div>
              <div className="flex">
                <span className="mr-2">(k)</span>
                <p>
                  to interfere with or circumvent the security features of the
                  Service or any related website, other websites, or the
                  Internet.
                </p>
              </div>
            </div>
            <p>
              We reserve the right to terminate your use of the Service or any
              related website for violating any of the prohibited uses.
            </p>
          </div>
        </section>

        <section aria-labelledby="section13">
          <h2 id="section13" className="mt-4 font-bold">
            {section13.title}
          </h2>
          <p>{section13.content}</p>
        </section>

        <section aria-labelledby="section14">
          <h2 id="section14" className="mt-4 font-bold">
            {section14.title}
          </h2>
          <p>{section14.content}</p>
        </section>

        <section aria-labelledby="section15">
          <h2 id="section15" className="mt-4 font-bold">
            {section15.title}
          </h2>
          <p>{section15.content}</p>
        </section>

        <section aria-labelledby="section16">
          <h2 id="section16" className="mt-4 font-bold">
            {section16.title}
          </h2>
          <p>{section16.content}</p>
        </section>

        <section aria-labelledby="section17">
          <h2 id="section17" className="mt-4 font-bold">
            {section17.title}
          </h2>
          <p>{section17.content}</p>
        </section>

        <section aria-labelledby="section18">
          <h2 id="section18" className="mt-4 font-bold">
            {section18.title}
          </h2>
          <p>{section18.content}</p>
        </section>

        <section aria-labelledby="section19">
          <h2 id="section19" className="mt-4 font-bold">
            {section19.title}
          </h2>
          <p>{section19.content}</p>
        </section>

        <section aria-labelledby="section20">
          <h2 id="section20" className="mt-4 font-bold">
            {section20.title}
          </h2>
          <p>
            Questions about the Terms of Service should be sent to us at{' '}
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
