'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const SignupPage: FC = () => {
  const [form, setForm] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // Client-side password match verification
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess('Account created successfully');
        // Optional: Auto-redirect after success
        setTimeout(() => router.push('/signin'), 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="flex min-h-[60vh] items-center justify-center py-10"
      aria-labelledby="signup-title"
    >
      <div className="w-96">
        <h1 id="signup-title" className="my-4 text-2xl font-bold">
          Sign Up
        </h1>

        {error && (
          <div className="mb-4 text-red-500" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-green-500" role="status" aria-live="polite">
            {success}
          </div>
        )}

        <div className="mb-4">
          <p>Create a new account below</p>
          <p>
            Already have an account? Sign in{' '}
            <Link
              href="/signin"
              className="cursor-pointer underline transition-colors duration-200 hover:text-gray-600"
            >
              here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstname" className="sr-only">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="First Name"
              className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.firstname}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="lastname" className="sr-only">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.lastname}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
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
              aria-required="true"
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
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-gray-800 p-2 text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
