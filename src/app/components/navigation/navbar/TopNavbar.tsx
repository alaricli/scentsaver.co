'use client';

import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function TopNavbar() {
  return (
    <nav className="bg-gray-900 p-1">
      <div className="flex w-full items-center justify-between px-2">
        <h1 className="text-white">Scent Saver</h1>
        <div className="flex items-center justify-end space-x-4">
          <Link href="/login" className="text-gray-400 hover:text-white">
            <button className="text-gray-400 hover:text-white">Log in</button>
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/signup">
            <button className="text-gray-400 hover:text-white">
              Create account
            </button>
          </Link>
          <Link href="/cart">
            <div className="flex items-center space-x-2 rounded-lg border border-gray-400 px-4 py-2 text-gray-400 hover:border-white hover:text-white">
              <FaShoppingCart />
              <span>Cart</span>
              {/* {totalQuantity > 0 && (
                <span className="ml-1 inline-block rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                  {totalQuantity}
                </span>
              )} */}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
