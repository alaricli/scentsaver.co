'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { customerLogin } from '../utils/shopify';

const LoginPage: FC = () => {
  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/customer');
    }
  }, [isLoggedIn, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const customerAccessToken = await customerLogin(
        form.email,
        form.password
      );
      login(customerAccessToken.accessToken);
      router.push('/customer');
    } catch (err) {
      setError('The email or password is incorrect.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="flex min-h-[60vh] items-center justify-center py-10"
      aria-labelledby="login-title"
    >
      <div className="w-96">
        <h1 id="login-title" className="my-4 text-2xl font-bold">
          Sign In
        </h1>

        {error && (
          <div className="mb-4 text-red-500" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <div className="mb-1">
          <p>Sign into your account below</p>
          <p>
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="cursor-pointer underline hover:text-gray-600"
            >
              Create one here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-gray-800 p-2 text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center">
            <Link
              href="/reset"
              className="font-xs underline hover:text-gray-700"
              aria-label="Reset your password"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
