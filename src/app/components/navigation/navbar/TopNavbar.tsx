import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function TopNavbar() {
  return (
    <nav className="bg-gray-900 p-1">
      <div className="flex w-full items-center justify-between px-2">
        <h1 className="text-white">Scent Saver</h1>
        <div className="flex items-center justify-end space-x-4">
          <button className="text-gray-400 hover:text-white">Log in</button>
          <span className="text-gray-400">|</span>
          <button className="text-gray-400 hover:text-white">
            Create account
          </button>
          <Link href="/cart">
            <div className="flex items-center space-x-2 rounded-lg border border-gray-400 px-4 py-2 text-gray-400 hover:border-white hover:text-white">
              <FaShoppingCart />
              <span>Cart</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
