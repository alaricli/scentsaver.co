'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { customerRecover } from '../utils/shopify';

interface FormState {
  email: string;
}

const ResetPage: FC = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await customerRecover(email);
      setSuccessMessage(
        'A password recovery email has been sent. Please check your inbox.'
      );
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Failed to send recovery email. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="flex min-h-[60vh] items-center justify-center py-10"
      aria-labelledby="reset-title"
    >
      <div className="w-96">
        <h1 id="reset-title" className="my-4 text-2xl font-bold">
          Password Reset
        </h1>

        {successMessage && (
          <div className="mb-4 text-green-500" role="status" aria-live="polite">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 text-red-500" role="alert" aria-live="polite">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <p>Enter your email address to receive a password reset link.</p>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {isSubmitting ? 'Sending...' : 'Send Recovery Email'}
          </button>

          <div className="text-center">
            <Link
              href="/signin"
              className="text-sm underline transition-colors duration-200 hover:text-gray-700"
              aria-label="Return to sign in page"
            >
              Return to Sign In
            </Link>
          </div>
        </form>
      </div>

      {/* Optional: Add schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Password Reset - scentsaver.co',
            description: 'Reset your scentsaver.co account password',
          }),
        }}
      />
    </main>
  );
};

export default ResetPage;
