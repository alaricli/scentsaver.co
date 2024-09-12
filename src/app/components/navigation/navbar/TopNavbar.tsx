import Link from 'next/link';

const TopNavbar = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <ul className="flex justify-center space-x-4 text-white">
        <li>
          <Link href="/" className="hover:text-gray-400">
            Scent Saver
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavbar;
