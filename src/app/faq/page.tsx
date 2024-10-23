import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-3xl p-16">
      <h1 className="my-6 text-center text-2xl font-bold">
        Frequently Asked Questions
      </h1>

      {/* Question 1 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">What Is scentsaver.co?</h2>
        <p className="mt-2">
          scentsaver.co is your trusted source for high-quality decants of
          luxurious and exclusive fragrances, all derived from authentic, retail
          bottles. As passionate fragrance enthusiasts, we understand the
          challenges of exploring new scents, including:
        </p>
        <ul className="mt-2 list-disc pl-6">
          <li className="mb-1">
            High pressure from sales associates when testing fragrances in
            retail stores, making it difficult to sample at your own pace.
          </li>
          <li className="mb-1">
            Wasted money from blind buying or committing to a full-sized bottle
            too early, only to find that the scent isn’t quite right.
          </li>
          <li className="mb-1">
            The desire to build a diverse fragrance collection without the
            commitment or expense of purchasing full-sized bottles you may never
            finish.
          </li>
        </ul>
        <p className="mt-2">
          At scentsaver.co, our goal is to solve these problems by offering
          decants in high-quality, travel-friendly spray vials—letting you enjoy
          a wide range of scents at a fraction of the cost, without any pressure
          or regret.
        </p>
      </div>

      {/* Question 2 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">What Is a Decant?</h2>
        <p className="mt-2">
          A fragrance decant is a smaller, hand-filled bottle of perfume that is
          taken from a full-size, original bottle. Unlike samples that are often
          provided by perfume brands, decants are typically not produced by the
          brand itself but are instead carefully transferred into smaller,
          travel-friendly atomizers by a trusted seller. This allows you to try
          a scent in a larger quantity than a sample without committing to a
          full bottle. Decants are a great way to explore a wide variety of
          fragrances or carry your favorite scents on the go!
        </p>
      </div>

      {/* Question 3 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          What Is the Decanting Process Like?
        </h2>
        <p className="mt-2">
          The decanting process involves carefully transferring a fragrance from
          its original full-size bottle into a smaller, high-quality atomizer.
          We use sterile equipment and clean, air-tight containers to ensure
          that the fragrance maintains its integrity throughout the process.
          Each decant is filled to order in a clean environment to prevent any
          contamination or loss of scent quality. This way, you get a fresh
          portion of the fragrance, making it easy to try different scents
          without purchasing a full bottle.
        </p>
      </div>

      {/* Question 4 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          What Is the Difference Between a Decant and a Sample?
        </h2>
        <p className="mt-2">
          The key difference between a decant and a sample lies in how they are
          packaged and the quantity of fragrance they contain. A sample is
          usually a small vial provided directly by the fragrance brand,
          typically around 1-2ml, and is meant for a quick test of the scent. A
          decant, on the other hand, is a larger portion of the original
          fragrance that we hand-fill into a travel-sized atomizer. Our decants
          usually range from 2ml to 10ml, giving you more product to enjoy
          before deciding if you want to invest in a full-size bottle. Decants
          are great for those who want to experience a fragrance over several
          wears or take their favorite scent on the go.
        </p>
      </div>

      {/* Question 5 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">How Long Will a Decant Last?</h2>
        <p className="mt-2">
          The longevity of a decant depends on its size and how often you use
          it. For example, a 2ml decant can provide approximately 20-25 sprays,
          while a 10ml decant offers around 100-125 sprays. If you use 2-3
          sprays each time, a 2ml decant can last around 1-2 weeks of daily
          wear, while a 10ml decant could last over a month. Decants are perfect
          for those who want to try a fragrance for an extended period before
          committing to a larger bottle. To ensure your decant lasts as long as
          possible, store it in a cool, dry place away from direct sunlight.
        </p>
      </div>

      {/* Question 6 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">What Payment Methods Can I Use?</h2>
        <p className="mt-2">
          For online orders, we accept the following methods of payment:
        </p>
        <ul className="mt-2 list-disc pl-6">
          <li className="mb-1">Visa</li>
          <li className="mb-1">MasterCard</li>
          <li className="mb-1">American Express</li>
          <li className="mb-1">PayPal*</li>
        </ul>
        <p className="mt-2 text-sm italic">
          *In the event of payment received through PayPal as "Pending E-Check,"
          the order will not ship until the payment has cleared. Scentsaver.co
          does not do wholesale, pre-sale or process any credit card payments
          via phone/email.
        </p>
      </div>

      {/* Question 7 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          What Countries Are You Currently Selling In?
        </h2>
        <p className="mt-2">
          As we have recently launched, we are only operating in Canada at this
          time. We will be expanding to the United States very shortly. Please
          join our newsletter below to stay up to date!
        </p>
      </div>

      {/* Question 8 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Will I Pay Duties & Taxes?</h2>
        <p className="mt-2">
          As a Canadian business operating in Canada, our Canadian customers
          will incur no duties unless regulations change. All Canadian orders
          will be charged their respective GST/HST rate at checkout.
        </p>
      </div>

      {/* Question 9 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          How Long Does It Take to Process My Order and How Can I Track It?
        </h2>
        <p className="mt-2">
          We ask our customers to allow us 3-5 business days of processing time
          to assemble your order before it ships. Please note that tracking is
          not available for In-Person Pick Up orders; instead, you will receive
          an email to arrange a pickup. To calculate your estimated delivery
          time, please add the estimated processing time to the delivery
          estimate of the shipping method you’ve chosen. Tracking will be sent
          via email and can be tracked on the website of the postal service used
          for your order.
        </p>
      </div>

      {/* Question 10 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          How Does the “In-Person Pick Up” Option Work?
        </h2>
        <p className="mt-2">
          We are operating in Vancouver, Canada. The “In-Person Pick Up"
          shipping method allows you to pay online for your order and have your
          order ready for pick-up in Vancouver. This process takes about 4-7
          business days. As soon as your order is ready for pick-up, you will
          receive an email to arrange for a pick-up timeslot. Please note that
          we do not currently supply tracking numbers for In-Store Pick Up
          orders.
        </p>
      </div>

      {/* Question 11 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">What is Your Return Policy?</h2>
        <p className="mt-2">
          Please find our return policy{' '}
          <Link href="/return-policy" className="underline hover:text-gray-600">
            here
          </Link>
          .
        </p>
      </div>

      {/* Question 12 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Can I Cancel My Order?</h2>
        <p className="mt-2">
          Online orders can be requested for cancellation as long as they have
          not been marked as shipped with tracking information provided.
          In-person pick up orders can be requested for cancellation as long as
          they have not been marked as ready for pick-up with pick-up
          arrangements finalized. If you would like to cancel your order, please
          email us at{' '}
          <a
            href="mailto:contact@scentsaver.co"
            className="underline hover:text-gray-600"
          >
            contact@scentsaver.co
          </a>{' '}
          as soon as possible. Within the email, please provide your Order
          Number, item(s) requested for cancellation, and we will get back to
          you as soon as possible. All cancellation requests are processed on a
          case-by-case basis and cancellation is not guaranteed upon request. If
          tracking information has been provided for an online order or an
          in-person pick up has already been arranged, we cannot proceed with a
          cancellation request.
        </p>
      </div>

      {/* Question 13 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Why Did I Receive an Email Requesting to Confirm Additional
          Information?
        </h2>
        <p className="mt-2">
          Occasionally, we require additional information if a placed order has
          a potential risk of fraudulent activity. We use this information for
          no other purpose than to verify and confirm the identity of the
          customer placing the order, and do not store this information in our
          systems. Scentsaver.co reserves the right to cancel and refund any
          orders which we think may carry a high risk of fraud for any reason,
          including orders we believe have not been placed by the original
          cardholder.
        </p>
      </div>

      {/* Question 14 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          I Still Have More Questions, How Can I Contact You?
        </h2>
        <p className="mt-2">
          Please feel free to contact us at{' '}
          <a
            href="mailto:contact@scentsaver.co"
            className="underline hover:text-gray-600"
          >
            contact@scentsaver.co
          </a>{' '}
          and we will be more than happy to assist you with any other inquiries
          and concerns.
        </p>
      </div>
    </div>
  );
}
