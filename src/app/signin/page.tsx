'use client';

import { useEffect, useState } from 'react';
import { customerLogin } from '../utils/shopify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<any | null>(null);
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/account');
    }
  }, [isLoggedIn, router]);

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

      login(customerAccessToken.accessToken);

      setError(null);
      router.push('/account');
    } catch (err: any) {
      setError('The email or password is incorrect.');
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-10">
      <div className="w-96">
        <h1 className="my-4 text-2xl font-bold">Sign In</h1>
        {error && <p className="text-red-500">{error}</p>}
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
          <div className="text-center">
            <Link
              href="/reset"
              className="font-xs underline hover:text-gray-700"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
