'use client';

import { useAuth } from '@/app/context/AuthContext';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import '@fontsource/dancing-script';
import BannerCarousel from './BannerCarousel';
import { useCart } from '@/app/context/CartContext';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const { totalQuantity } = useCart();

  return (
    <nav>
      <BannerCarousel />

      {/* Top Navbar */}
      <div className="bg-gray-900 p-1">
        <div className="flex w-full items-center justify-between px-2">
          <Link href="/">
            <div className="flex items-baseline space-x-2">
              <h1 className="font-dancing text-3xl text-white">
                scentsaver.net
              </h1>
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
      </div>

      {/* Bottom Navbar */}
      <div className="bg-gray-900 p-1">
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
      </div>
    </nav>
  );
}
