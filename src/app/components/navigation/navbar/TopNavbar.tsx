'use client';

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import '@fontsource/dancing-script';

export default function TopNavbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-gray-900 p-1">
      <div className="flex w-full items-center justify-between px-2">
        <Link href="/">
          <div className="flex items-baseline space-x-2">
            <h1 className="font-dancing text-3xl text-white">scentsaver.net</h1>
            <h2 className="text-l font-dancing text-white">makes scents</h2>
          </div>
        </Link>
        <div className="flex items-center justify-end space-x-4">
          {isLoggedIn ? (
            <Link href="/account" className="text-gray-400 hover:text-white">
              <button className="text-gray-400 hover:text-white">
                Account
              </button>
            </Link>
          ) : (
            <>
              <Link href="/signin" className="text-gray-400 hover:text-white">
                <button className="text-gray-400 hover:text-white">
                  Log in
                </button>
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/signup">
                <button className="text-gray-400 hover:text-white">
                  Create account
                </button>
              </Link>
            </>
          )}
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
