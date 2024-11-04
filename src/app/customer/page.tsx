'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { CustomerData, Order } from '@/types/types';
import { useAuth } from '../context/AuthContext';
import { retrieveCustomer } from '../utils/shopify';

const AccountPage: FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    defaultAddress: null,
    orders: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const fetchCustomerData = async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const customer = await retrieveCustomer(token);

      setCustomerData({
        defaultAddress: customer.defaultAddress || null,
        orders:
          customer.orders?.edges.map((edge: { node: Order }) => edge.node) ||
          [],
      });
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
      setError('Failed to load account information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get('customerAccessToken');
    if (!token) {
      router.push('/signin');
    } else {
      fetchCustomerData(token);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg">Loading account information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() =>
              fetchCustomerData(Cookies.get('customerAccessToken') || '')
            }
            className="mt-4 text-sm underline hover:text-gray-600"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main
      className="flex min-h-[60vh] w-full items-start justify-between p-4"
      aria-labelledby="account-title"
    >
      <div className="grid w-full grid-cols-1 gap-8 p-4 md:grid-cols-[3fr_1fr]">
        {/* Header Section */}
        <div className="col-span-full flex items-start justify-between">
          <div>
            <h1 id="account-title" className="mb-2 text-2xl font-semibold">
              Your Account
            </h1>
            <button
              onClick={handleLogout}
              className="text-sm transition-colors duration-200 hover:text-gray-600"
              aria-label="Sign out of your account"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Order History Section */}
        <section aria-labelledby="order-history-title">
          <h2 id="order-history-title" className="mb-4 text-lg font-semibold">
            Order History
          </h2>

          {customerData.orders.length > 0 ? (
            <div className="space-y-4">
              {customerData.orders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="rounded-md border p-4 transition-colors duration-200 hover:bg-gray-50"
                >
                  <p className="font-medium">Order #{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">
                    Total: {order.totalPriceV2.amount}{' '}
                    {order.totalPriceV2.currencyCode}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No orders yet.</p>
          )}
        </section>

        {/* Address Section */}
        <section aria-labelledby="addresses-title" className="bg-white">
          <h2 id="addresses-title" className="mb-4 text-lg font-semibold">
            Addresses
          </h2>

          {customerData.defaultAddress ? (
            <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  Default Address
                </span>
              </div>

              <div className="space-y-1 text-gray-600">
                {/* Name section if you have it in your data */}
                <div className="border-b border-gray-100 pb-2">
                  <p className="font-medium text-gray-900">
                    {customerData.defaultAddress.address1}
                  </p>
                </div>

                {/* Address details */}
                <div className="pt-2">
                  {customerData.defaultAddress.address2 && (
                    <p>{customerData.defaultAddress.address2}</p>
                  )}
                  <p>
                    {[
                      customerData.defaultAddress.city,
                      customerData.defaultAddress.province,
                      customerData.defaultAddress.country,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                  {customerData.defaultAddress.zip && (
                    <p>{customerData.defaultAddress.zip}</p>
                  )}
                  {customerData.defaultAddress.phone && (
                    <div className="mt-2 flex items-center text-sm">
                      <svg
                        className="mr-2 h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {customerData.defaultAddress.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Address Actions */}
              <div className="mt-4 flex space-x-4 border-t border-gray-100 pt-4">
                <Link
                  href="/customer/addresses"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit address
                </Link>
                <Link
                  href="/customer/addresses"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add new address
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No address saved
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Add a new address to your account.
              </p>
              <div className="mt-6">
                <Link
                  href="/customer/addresses"
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add address
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AccountPage;
