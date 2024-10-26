'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const Newsletter: React.FC<{
  bordered?: boolean;
}> = ({ bordered = false }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({
    message: '',
    type: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          message: 'Thank you for subscribing!',
          type: 'success',
        });
        setEmail('');
      } else {
        setStatus({
          message: data.error || 'Something went wrong. Please try again.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus({
        message: 'An error occurred. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearStatus = useCallback(() => {
    if (status.message) {
      const timeout = setTimeout(() => {
        setStatus({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [status.message]);

  useEffect(() => {
    return clearStatus();
  }, [status.message, clearStatus]);

  return (
    <div className="w-auto" role="form" aria-label="Newsletter signup">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center"
        noValidate
      >
        <div className="relative flex w-full">
          <label htmlFor="email-input" className="sr-only">
            Email address
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="Email address"
            className={`w-full rounded-l-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${bordered ? 'border-2 border-gray-900' : ''} `}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-invalid={status.type === 'error'}
            aria-describedby={status.message ? 'status-message' : undefined}
            disabled={isSubmitting}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <button
            type="submit"
            className={`rounded-r-md bg-blue-600 p-2 px-4 font-bold text-white transition-colors duration-200 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${bordered ? 'border-2 border-l-0 border-gray-900' : ''} `}
            disabled={isSubmitting}
            aria-label="Subscribe to newsletter"
          >
            {isSubmitting ? 'Joining...' : 'Join'}
          </button>
        </div>
      </form>

      {/* Status Message */}
      {status.message && (
        <p
          id="status-message"
          className={`mt-2 text-center text-sm ${
            status.type === 'success' ? 'text-green-500' : 'text-red-500'
          }`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      )}

      {/* Terms and Privacy */}
      <p className="p-1 text-left text-sm">
        By entering your email, you agree to our{' '}
        <Link
          href="/terms"
          className="underline transition-colors duration-200 hover:text-gray-300"
          aria-label="Read our Terms of Use"
        >
          Terms of Use
        </Link>{' '}
        &{' '}
        <Link
          href="/privacy"
          className="underline transition-colors duration-200 hover:text-gray-300"
          aria-label="Read our Privacy Policy"
        >
          Privacy Policy
        </Link>
        , including receipt of emails and promotions. You can unsubscribe at any
        time.
      </p>

      {/* Optional: Add schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsletterService',
            name: 'scentsaver.co Newsletter',
            description: 'Subscribe to receive updates and promotions',
          }),
        }}
      />
    </div>
  );
};

export default Newsletter;
