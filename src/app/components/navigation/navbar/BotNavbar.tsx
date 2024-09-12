import Link from 'next/link';

const BotNavbar = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <ul className="flex justify-center space-x-4 text-white">
        <li>
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/decant" className="hover:text-gray-400">
            Shop Decants
          </Link>
        </li>
        <li>
          <Link href="/bottle" className="hover:text-gray-400">
            Shop Bottles
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BotNavbar;
