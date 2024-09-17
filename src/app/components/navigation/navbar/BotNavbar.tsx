import Link from 'next/link';

const BotNavbar = () => {
  return (
    <nav className="bg-gray-900 p-1">
      <div className="grid grid-cols-3 items-center">
        <div></div>
        <div className="jusitfy-center mx-auto flex text-white">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/decant" className="hover:text-gray-400">
            Shop Decants
          </Link>
          <Link href="/bottle" className="hover:text-gray-400">
            Shop Bottles
          </Link>
          <Link href="/candle" className="hover:text-gray-400">
            Shop Candles
          </Link>
          <Link href="/homegood" className="hover:text-gray-400">
            Shop Home Goods
          </Link>
        </div>
        <div className="flex justify-end text-white">
          <p>Search</p>
        </div>
      </div>
    </nav>
  );
};

export default BotNavbar;
