'use client';

import { FC, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import {
  deleteCustomerAddress,
  retrieveCustomer,
  setCustomerDefaultAddress,
} from '@/app/utils/shopify';
import { Address } from '@/types/types';

const AddressPage: FC = () => {
  const [state, setState] = useState({
    defaultAddress: null as Address | null,
    otherAddresses: [] as Address[],
    isLoading: true,
    error: null as string | null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const fetchAddressData = useCallback(async (token: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const customer = await retrieveCustomer(token);
      const defaultAddress = customer.defaultAddress || null;

      const allAddresses: Address[] =
        customer.addresses?.edges.map((edge: { node: Address }) => edge.node) ||
        [];

      const otherAddresses = allAddresses.filter(
        (address: Address) => address.id !== defaultAddress?.id
      );

      setState({
        defaultAddress,
        otherAddresses,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load addresses. Please try again.',
      }));
    }
  }, []);

  const handleSetDefault = async (addressId: string) => {
    const token = Cookies.get('customerAccessToken');
    if (!token) return;

    setIsProcessing(true);
    try {
      await setCustomerDefaultAddress(token, addressId);
      await fetchAddressData(token);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to set default address. Please try again.',
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddressDelete = async (addressId: string) => {
    const token = Cookies.get('customerAccessToken');
    if (!token) return;

    setIsProcessing(true);
    try {
      await deleteCustomerAddress(token, addressId);
      await fetchAddressData(token);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to delete address. Please try again.',
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get('customerAccessToken');
    if (!token) {
      router.push('/signin');
    } else {
      fetchAddressData(token);
    }
  }, [fetchAddressData]);

  if (state.isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg">Loading addresses...</p>
      </div>
    );
  }

  return (
    <main
      className="flex min-h-[60vh] w-full flex-col items-center p-6"
      aria-labelledby="addresses-title"
    >
      <div className="w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 id="addresses-title" className="text-2xl font-semibold">
            Addresses
          </h1>
          <Link
            href="/customer"
            className="text-sm text-blue-600 transition-colors hover:text-blue-800"
          >
            Return to your account
          </Link>
        </div>

        {state.error && (
          <div
            className="mb-4 rounded-md bg-red-50 p-4 text-red-700"
            role="alert"
          >
            {state.error}
          </div>
        )}

        <Link
          href="/customer/addresses/add"
          className="mb-8 inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
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
          Add a New Address
        </Link>

        <div className="space-y-8">
          {/* Default Address Section */}
          <section aria-labelledby="default-address-title">
            <h2
              id="default-address-title"
              className="mb-4 text-lg font-semibold"
            >
              Default Address
            </h2>

            {state.defaultAddress ? (
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    Default Address
                  </span>
                </div>

                <div className="space-y-1 text-gray-600">
                  <div className="border-b border-gray-100 pb-2">
                    <p className="font-medium text-gray-900">
                      {state.defaultAddress.address1}
                    </p>
                  </div>

                  <div className="pt-2">
                    {state.defaultAddress.address2 && (
                      <p>{state.defaultAddress.address2}</p>
                    )}
                    <p>
                      {[
                        state.defaultAddress.city,
                        state.defaultAddress.province,
                        state.defaultAddress.country,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                    {state.defaultAddress.zip && (
                      <p>{state.defaultAddress.zip}</p>
                    )}
                    {state.defaultAddress.phone && (
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
                        {state.defaultAddress.phone}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <button
                      onClick={() =>
                        handleAddressDelete(state.defaultAddress!.id)
                      }
                      disabled={isProcessing}
                      className="text-sm text-red-600 transition-colors hover:text-red-800 disabled:opacity-50"
                      aria-label="Delete default address"
                    >
                      Delete address
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                <p className="text-gray-500">No default address set</p>
              </div>
            )}
          </section>

          {/* Other Addresses Section */}
          <section aria-labelledby="other-addresses-title">
            <h2
              id="other-addresses-title"
              className="mb-4 text-lg font-semibold"
            >
              Other Addresses
            </h2>

            {state.otherAddresses.length > 0 ? (
              <div className="space-y-4">
                {state.otherAddresses.map((address: Address) => (
                  <div
                    key={address.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="space-y-1 text-gray-600">
                      <p className="font-medium text-gray-900">
                        {address.address1}
                      </p>
                      {address.address2 && <p>{address.address2}</p>}
                      <p>
                        {[address.city, address.province, address.country]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                      {address.zip && <p>{address.zip}</p>}
                      {address.phone && (
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
                          {address.phone}
                        </div>
                      )}

                      <div className="mt-4 flex space-x-4 border-t border-gray-100 pt-4">
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          disabled={isProcessing}
                          className="text-sm text-blue-600 transition-colors hover:text-blue-800 disabled:opacity-50"
                          aria-label={`Set ${address.address1} as default address`}
                        >
                          Set as default
                        </button>
                        <button
                          onClick={() => handleAddressDelete(address.id)}
                          disabled={isProcessing}
                          className="text-sm text-red-600 transition-colors hover:text-red-800 disabled:opacity-50"
                          aria-label={`Delete ${address.address1}`}
                        >
                          Delete address
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                <p className="text-gray-500">No additional addresses</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default AddressPage;
