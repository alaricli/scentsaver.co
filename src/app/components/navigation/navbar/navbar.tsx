import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <ul className="flex justify-center space-x-4 text-white">
        <li>
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/cards" className="hover:text-gray-400">
            Shop Decants
          </Link>
        </li>
        <li>
          <Link href="/decks" className="hover:text-gray-400">
            Shop Bottles
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
