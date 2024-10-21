'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { retrieveCustomer } from '@/app/utils/shopify';
import { Address } from '@/types/types';

export default function AddressPage() {
  const [otherAddresses, setOtherAddresses] = useState<Address[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const router = useRouter();

  const handleAddressUpdate = async () => {};

  const handleAddressDelete = async () => {};

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
      {/* button that toggle dropdown address form  */}
      <Link
        href="/account/addresses/add"
        className="m-2 border border-blue-700 p-2"
      >
        Add a new address
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
              <button className="mr-2 text-sm">edit address</button>
              <button className="text-sm">delete address</button>
            </div>
          ) : (
            <div>
              <p>No default address set</p>
              <button className="mr-2 text-sm">edit address</button>
              <button className="text-sm">delete address</button>
            </div>
          )}
        </div>
        <div className="mt-2">
          <h2 className="font-semibold">Other Addresses</h2>
          {/* TODO: render the list of other addresses that aren't default here */}
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
                <button className="mr-2 text-sm">edit address</button>
                <button className="text-sm">delete address</button>
              </div>
            ))
          ) : (
            <div>
              <button className="mr-2 text-sm">edit address</button>
              <button className="text-sm">delete address</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
