'use client';

import { FC } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import '@fontsource/dancing-script';
import BannerCarousel from './BannerCarousel';
import { NavLink } from '@/types/types';

const navigationLinks: NavLink[] = [
  { href: '/all', label: 'Shop All' },
  { href: '/decant', label: 'Decants' },
  { href: '/bottle', label: 'Bottles' },
  { href: '/candle', label: 'Candles' },
  { href: '/homeproduct', label: 'Home Products' },
  { href: '/accessory', label: 'Accessories' },
];

const Navbar: FC = () => {
  const { isLoggedIn, loading, logout } = useAuth();

  return (
    <header role="banner">
      <BannerCarousel />

      <nav
        className="bg-gray-900"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Top Navbar */}
        <div className="p-1">
          <div className="flex w-full items-center justify-between px-2">
            <Link href="/" aria-label="scentsaver.co home">
              <div className="flex items-baseline space-x-2">
                <h1 className="ml-3 mt-1 font-dancing text-4xl font-medium text-white">
                  scentsaver.co
                </h1>
                <h2 className="text-l font-dancing text-white">makes scents</h2>
              </div>
            </Link>

            <div className="flex items-center justify-end space-x-4">
              {/* Auth Section */}
              {loading ? (
                <span className="sr-only">
                  Loading authentication status...
                </span>
              ) : isLoggedIn ? (
                <Link
                  href="/customer"
                  className="text-gray-400 transition-colors duration-200 hover:text-white"
                  aria-label="View account"
                >
                  <button className="text-gray-400 hover:text-white">
                    Account
                  </button>
                </Link>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
                    aria-label="Sign in to your account"
                  >
                    <button className="text-gray-400 hover:text-white">
                      Log in
                    </button>
                  </Link>
                  <span className="text-gray-400" aria-hidden="true">
                    |
                  </span>
                  <Link
                    href="/signup"
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
                    aria-label="Create a new account"
                  >
                    <button className="text-gray-400 hover:text-white">
                      Create account
                    </button>
                  </Link>
                </>
              )}

              {/* Cart Link */}
              <Link href="/cart" aria-label="View shopping cart">
                <div className="flex items-center space-x-2 rounded-lg border border-gray-400 px-4 py-2 text-gray-400 transition-colors duration-200 hover:border-white hover:text-white">
                  <FaShoppingCart aria-hidden="true" />
                  <span>Cart</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Navbar */}
        <div className="flex items-center justify-between p-1">
          {/* Main Navigation */}
          <div className="mx-auto flex justify-center space-x-4 text-white">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-gray-400"
                aria-label={`View ${link.label}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar
          <form
            className="flex items-center justify-end space-x-2 bg-white"
            role="search"
            aria-label="Site search"
          >
            <input
              type="search"
              placeholder="Search..."
              className="px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search products"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="p-1 hover:text-gray-700"
            >
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-900"
                aria-hidden="true"
              />
            </button>
          </form> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
