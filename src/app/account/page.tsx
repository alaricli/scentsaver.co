'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Address, Order } from '@/types/types';
import { retrieveCustomer } from '../utils/shopify';

export default function AccountPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);

  const { isLoggedIn, logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const fetchCustomerData = async (token: string) => {
    try {
      const customer = await retrieveCustomer(token);
      if (customer.defaultAddress) {
        setDefaultAddress(customer.defaultAddress);
      }

      if (customer.orders) {
        const orders: Order[] = customer.orders.edges.map(
          (edge: { node: Order }) => edge.node
        );

        setOrders(orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders data', error);
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

  return (
    <div className="flex w-full items-center justify-between p-4">
      <div className="grid w-full grid-cols-[3fr_1fr] gap-4 p-4">
        {/* Top Left */}
        <div className="mb-8 flex flex-col items-start justify-start">
          <h1 className="mb-2 text-2xl font-semibold">Your Account</h1>
          <button
            onClick={handleLogout}
            className="text-sm hover:text-gray-600"
          >
            Sign Out
          </button>
        </div>
        {/* Top Right */}
        <div className="flex flex-col items-center justify-end"></div>
        {/* Bottom Left: Order History */}
        <div className="flex flex-col items-start justify-start">
          <p className="text-lg font-semibold">Order History</p>
          {orders.length > 0 ? (
            <div className="mt-4">
              {orders.map((order) => (
                <div key={order.orderNumber} className="mb-2 border-b pb-2">
                  <p className="text-sm">Order Number: {order.orderNumber}</p>
                  <p className="text-sm">
                    Total Price: {order.totalPriceV2.amount}{' '}
                    {order.totalPriceV2.currencyCode}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm">No orders yet.</p>
          )}
        </div>

        {/* Bottom Right: Addresses */}
        <div className="flex flex-col items-start justify-start">
          <p className="text-lg font-semibold">Addresses</p>
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
            </div>
          ) : (
            <div></div>
          )}
          <Link
            href="/account/addresses"
            className="text-sm underline underline-offset-1 hover:text-gray-600"
          >
            Edit address
          </Link>
          <Link
            href="/account/addresses"
            className="text-sm underline underline-offset-1 hover:text-gray-600"
          >
            Add a new address
          </Link>
        </div>
      </div>
    </div>
  );
}
