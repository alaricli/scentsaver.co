'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import {
  createCustomerAddress,
  setCustomerDefaultAddress,
} from '@/app/utils/shopify';

interface AddressForm {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  province: string;
  zip: string;
  phone: string;
  default: boolean;
}

const PROVINCES = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland & Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' },
] as const;

const AddAddressPage: FC = () => {
  const [form, setForm] = useState<AddressForm>({
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
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get('customerAccessToken');
    if (!token) return;

    setIsSubmitting(true);
    setError(null);

    try {
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

      const newAddressId = await createCustomerAddress(token, addressInput);

      if (form.default) {
        await setCustomerDefaultAddress(token, newAddressId);
      }

      router.push('/account/addresses');
    } catch (error) {
      console.error('Failed to add address:', error);
      setError('Failed to add address. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get('customerAccessToken');
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <main
      className="flex min-h-[60vh] items-center justify-center py-10"
      aria-labelledby="add-address-title"
    >
      <div className="w-96">
        <h1 id="add-address-title" className="mb-6 text-2xl font-bold">
          Add a New Address
        </h1>

        {error && (
          <div className="mb-4 text-red-500" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Company Field */}
            <div>
              <label htmlFor="company" className="sr-only">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Company (optional)"
                className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.company}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* Address Fields */}
            <div>
              <label htmlFor="address1" className="sr-only">
                Address Line 1
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                placeholder="Address Line 1"
                className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.address1}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="address2" className="sr-only">
                Address Line 2
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                placeholder="Address Line 2 (optional)"
                className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.address2}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* City Field */}
            <div>
              <label htmlFor="city" className="sr-only">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.city}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Country and Province Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.country}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <div>
                <label htmlFor="province" className="sr-only">
                  Province
                </label>
                <select
                  id="province"
                  name="province"
                  className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.province}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select Province</option>
                  {PROVINCES.map((province) => (
                    <option key={province.value} value={province.value}>
                      {province.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Postal Code and Phone Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="zip" className="sr-only">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  placeholder="Postal Code"
                  className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.zip}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Default Address Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="default"
                name="default"
                checked={form.default}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    default: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              <label htmlFor="default" className="ml-2 text-sm text-gray-700">
                Set as default address
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full rounded-md bg-gray-800 p-2 text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Address...' : 'Add Address'}
            </button>
            <div className="text-center">
              <Link
                href="/account/addresses"
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddAddressPage;
