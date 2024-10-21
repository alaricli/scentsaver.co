'use client';

import { useState } from 'react';
import { customerLogin } from '../utils/shopify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const customerAccessToken = await customerLogin(
        form.email,
        form.password
      );

      Cookies.set('customerAccessToken', customerAccessToken.accessToken, {
        expires: 399,
        secure: true,
        sameSite: 'Strict',
        path: '/',
      });
      setSuccess('Login successful');

      router.push('/account');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-10">
      <div className="w-96">
        <h1 className="my-4 text-2xl font-bold">Sign In</h1>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className="mb-1">
          <p>Sign into your account below</p>
          <p>
            Don't have an account? Create one{' '}
            <Link href="/signup">
              <span className="cursor-pointer underline hover:text-gray-600">
                here
              </span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-gray-800 p-2 text-white"
          >
            Log In
          </button>
          <p className="font-xs text-center text-gray-700">
            Forgot your password?
          </p>
        </form>
      </div>
    </div>
  );
}
