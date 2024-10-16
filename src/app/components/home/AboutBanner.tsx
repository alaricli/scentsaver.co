export default function AboutBanner() {
  return (
    <div className="flex w-full items-center justify-center bg-gray-100">
      <div className="container mx-auto p-8">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Why scentsavers.net?
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* First slogan */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">Big Savings</h3>
            <p className="text-center text-gray-600">
              Sample exclusive fragrances before committing to a full bottle or
              collect a variety of luxurious scents for amazingly low prices
            </p>
          </div>

          {/* Second slogan */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">
              100% Authenticity Guaranteed
            </h3>
            <p className="text-center text-gray-600">
              Trustworthy and safe, we aim to deliver the highest quality
              decants from authentic retail bottles
            </p>
          </div>

          {/* Third slogan */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">
              Free Shipping to CAN/USA
            </h3>
            <p className="text-center text-gray-600">On orders over $99</p>
          </div>
        </div>
      </div>
    </div>
  );
}
