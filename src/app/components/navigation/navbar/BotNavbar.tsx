import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

const BotNavbar = () => {
  return (
    <nav className="bg-gray-900 p-1">
      <div className="flex items-center justify-between">
        <div className="mx-auto flex justify-center space-x-4 text-white">
          <Link href="/all" className="hover:text-gray-400">
            Shop All
          </Link>
          <Link href="/decant" className="hover:text-gray-400">
            Decants
          </Link>
          <Link href="/bottle" className="hover:text-gray-400">
            Bottles
          </Link>
          <Link href="/candle" className="hover:text-gray-400">
            Candles
          </Link>
          <Link href="/homeproduct" className="hover:text-gray-400">
            Home Products
          </Link>
          <Link href="/accessory" className="hover:text-gray-400">
            Accessories
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-2 bg-white text-white">
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 text-gray-900"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-900" />
        </div>
      </div>
    </nav>
  );
};

export default BotNavbar;
