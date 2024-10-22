'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  createCustomerAddress,
  setCustomerDefaultAddress,
} from '@/app/utils/shopify';
import Link from 'next/link';

export default function AddAddressPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    country: 'Canada',
    province: '',
    zip: '',
    phone: '',
    default: true,
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get('customerAccessToken');

    const addressInput = {
      firstName: form.firstName,
      lastName: form.lastName,
      company: form.company,
      address1: form.address1,
      address2: form.address2,
      city: form.city,
      country: form.country,
      province: form.province,
      zip: form.zip,
      phone: form.phone,
    };

    try {
      const newAddressId = await createCustomerAddress(token, addressInput);
      if (form.default) {
        await setCustomerDefaultAddress(token, newAddressId);
      }

      alert('Successfully added new address.');
      router.push('/account/addresses');
    } catch (error) {
      console.error('Failed to add address:', error);
      alert('There was an issue adding your address. Please try again.');
    }
  };

  useEffect(() => {
    const token = Cookies.get('customerAccessToken');
    if (!token) {
      router.push('/signin');
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-between p-4">
      <h1 className="text-2xl font-semibold">Add a New Address</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Company"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={form.company}
            onChange={handleChange}
          />
          <input
            type="text"
            id="address1"
            name="address1"
            placeholder="Address1"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={form.address1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="address2"
            name="address2"
            placeholder="Address2"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={form.address2}
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={form.city}
            onChange={handleChange}
            required
          />
          <select
            id="country"
            name="country"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={form.country}
            onChange={handleChange}
            required
          >
            <option value="Canada">Canada</option>
          </select>
          <select
            id="province"
            name="province"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={form.province}
            onChange={handleChange}
            required
          >
            <option value="">Select Province</option>
            <option value="ON">Ontario</option>
            <option value="QC">Quebec</option>
            <option value="BC">British Columbia</option>
          </select>
          <input
            type="text"
            id="zip"
            name="zip"
            placeholder="Postal Code"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={form.zip}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="default"
              name="default"
              checked={form.default}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  default: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="default" className="ml-2">
              Set as default address
            </label>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-gray-800 p-2 text-white"
          >
            Add Address
          </button>
          <Link
            href="/account/addresses"
            className="font-xs text-center underline hover:text-gray-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
