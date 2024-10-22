'use client';

import { NewsletterProps } from '@/types/types';
import React, { useEffect, useState } from 'react';

export default function Newsletter({ bordered = false }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        setStatus('Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (status) {
      const timeout = setTimeout(() => setStatus(''), 3000);
      return () => clearTimeout(timeout);
    }
  });

  return (
    <div className="w-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center"
      >
        <input
          type="email"
          placeholder="Email address"
          className={`w-full rounded-l-md p-2 text-black ${bordered ? 'border-2 border-gray-900' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`rounded-r-md bg-blue-600 p-2 px-4 font-bold text-white hover:bg-blue-900 ${bordered ? 'border-2 border-l-0 border-gray-900' : ''}`}
        >
          Join
        </button>
      </form>
      {status && <p className="text-center text-sm">{status}</p>}
      <p className="text-left text-sm">
        By entering your email, you agree to our Terms of Use & Privacy Policy,
        including receipt of emails and promotions. You can unsubcribe at any
        time.
      </p>
    </div>
  );
}
