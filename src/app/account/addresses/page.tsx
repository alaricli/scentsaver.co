'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import {
  deleteCustomerAddress,
  retrieveCustomer,
  setCustomerDefaultAddress,
} from '@/app/utils/shopify';
import { Address } from '@/types/types';

export default function AddressPage() {
  const [otherAddresses, setOtherAddresses] = useState<Address[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const router = useRouter();

  const handleSetDefault = async (addressId: string) => {
    const token = Cookies.get('customerAccessToken');
    try {
      await setCustomerDefaultAddress(token, addressId);

      if (defaultAddress) {
        setOtherAddresses((prevAddresses) => [
          ...prevAddresses,
          defaultAddress,
        ]);
      }

      const newDefaultAddress = otherAddresses.find(
        (address) => address.id === addressId
      );

      if (newDefaultAddress) {
        setDefaultAddress(newDefaultAddress);
        setOtherAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address.id !== addressId)
        );
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleAddressDelete = async (addressId: string) => {
    const token = Cookies.get('customerAccessToken');
    try {
      await deleteCustomerAddress(token, addressId);

      setOtherAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== addressId)
      );

      if (defaultAddress?.id === addressId) {
        setDefaultAddress(null);
      }

      router.refresh();
      alert('Address deleted successfully.');
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Failed to delete address. Please try again.');
    }
  };

  const fetchAddressData = async (token: string) => {
    try {
      const customer = await retrieveCustomer(token);
      if (customer.defaultAddress) {
        setDefaultAddress(customer.defaultAddress);
      }

      if (customer.addresses) {
        const allAddresses: Address[] = customer.addresses.edges.map(
          (edge: { node: Address }) => edge.node
        );
        const otherAddresses = allAddresses.filter(
          (address: Address) => address.id !== customer.defaultAddress?.id
        );

        setOtherAddresses(otherAddresses);
      }
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
    }
  };

  useEffect(() => {
    const token = Cookies.get('customerAccessToken');
    if (!token) {
      router.push('/signin');
    } else {
      fetchAddressData(token);
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-between p-4">
      <h1 className="text-2xl font-semibold">Addresses</h1>
      <Link href="/account" className="text-sm underline">
        Return to your account
      </Link>
      <Link
        href="/account/addresses/add"
        className="m-2 border border-gray-900 p-2"
      >
        Add a New Address
      </Link>
      {/* static address content bottom part */}
      <div>
        <div>
          <h2 className="font-semibold">Default Address</h2>
          {defaultAddress ? (
            <div className="border p-2">
              <p>{defaultAddress.address1}</p>
              <p>{defaultAddress.address2}</p>
              <p>
                {defaultAddress.city}, {defaultAddress.province},{' '}
                {defaultAddress.country}
              </p>
              <p>{defaultAddress.zip}</p>
              <p>{defaultAddress.phone}</p>
              <button
                className="text-sm"
                onClick={() => handleAddressDelete(defaultAddress.id)}
              >
                delete address
              </button>
            </div>
          ) : (
            <div>
              <p>No default address set</p>
              <button className="text-sm">delete address</button>
            </div>
          )}
        </div>
        <div className="mt-2">
          <h2 className="font-semibold">Other Addresses</h2>
          {otherAddresses.length > 0 ? (
            otherAddresses.map((address: Address) => (
              <div key={address.id} className="mt-2 border p-2">
                <p>{address.address1}</p>
                <p>{address.address2}</p>
                <p>
                  {address.city}, {address.province}, {address.country}
                </p>
                <p>{address.zip}</p>
                <p>{address.phone}</p>
                <button
                  className="mr-2 text-sm"
                  onClick={() => handleSetDefault(address.id)}
                >
                  set default
                </button>
                <button
                  className="text-sm"
                  onClick={() => handleAddressDelete(address.id)}
                >
                  delete address
                </button>
              </div>
            ))
          ) : (
            <div>
              <button className="mr-2 text-sm">set default</button>
              <button className="text-sm">delete address</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
