'use client';

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import '@fontsource/dancing-script';

export default function TopNavbar() {
  const { isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const handleMouseEnter = () => {
    setShowDropdown(true); // Show dropdown on hover
  };

  const handleMouseLeave = () => {
    setShowDropdown(false); // Hide dropdown when the mouse leaves
  };

  return (
    <nav className="bg-gray-900 p-1">
      <div className="flex w-full items-center justify-between px-2">
        <Link href="/">
          <div className="flex items-baseline space-x-2">
            <h1 className="font-dancing text-3xl text-white">scentsaver.net</h1>
            <h2 className="font-dancing text-l text-white">save on scents</h2>
          </div>
        </Link>
        <div className="flex items-center justify-end space-x-4">
          {isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter} // Keep dropdown open on hover
              onMouseLeave={handleMouseLeave} // Hide dropdown when mouse leaves
            >
              {/* Account button */}
              <button className="text-gray-400 hover:text-white">
                Account
              </button>

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg">
                  <Link href="/account">
                    <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                      My Account
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-gray-400 hover:text-white">
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
