'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { customerRecover } from '../utils/shopify';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await customerRecover(email);
      setSuccessMessage(
        'A password recovery email has been sent. Please check your inbox.'
      );
      setErrorMessage(null);
    } catch (err: any) {
      const errorMessage =
        err.message || 'Failed to send recovery email. Please try again.';
      setErrorMessage(errorMessage);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold">
          Password Reset
        </h1>
        {successMessage && (
          <p className="mb-4 text-center text-green-500">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mb-4 text-center text-red-500">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="mt-1 block w-full rounded-md border border-gray-500 p-2 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <button
            type="submit"
            className="w-full rounded-md bg-gray-800 p-2 text-white"
          >
            Send Recovery Email
          </button>
        </form>
        <div className="mt-1 text-center">
          <Link
            href={'/signin'}
            className="text-sm underline hover:text-gray-700"
          >
            return to Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
