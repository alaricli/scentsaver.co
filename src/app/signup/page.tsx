'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!');
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
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error');
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-10">
      <div className="w-96">
        <h1 className="my-4 text-2xl font-bold">Sign Up</h1>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="mb-1">
          <p>Create a new account below</p>
          <p>
            Already have an account? Sign in{' '}
            <Link href="/signin">
              <span className="cursor-pointer underline hover:text-gray-600">
                here
              </span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="First Name"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-gray-800 p-2 text-white"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
