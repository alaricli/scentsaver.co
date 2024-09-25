'use client';

import { useState } from 'react';
import { customerLogin } from '../utils/shopify';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

      localStorage.setItem(
        'customerAccessToken',
        customerAccessToken.accessToken
      );
      setSuccess('Login successful');

      // You can redirect the user after successful login
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="my-4 text-2xl font-bold">Signup</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 p-2 text-white"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
