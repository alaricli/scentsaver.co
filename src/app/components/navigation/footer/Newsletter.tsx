import { NewsletterProps } from '@/types/types';
import React, { useState } from 'react';

export default function Newsletter({ bordered = false }: NewsletterProps) {
  return (
    <div className="w-auto">
      <form className="flex items-center justify-center">
        <input
          type="email"
          placeholder="Email address"
          className={`w-full rounded-l-md p-2 text-black ${bordered ? 'border-2 border-gray-900' : ''}`}
        />
        <button
          type="submit"
          className={`rounded-r-md bg-blue-600 p-2 px-4 font-bold text-white hover:bg-blue-900 ${bordered ? 'border-2 border-l-0 border-gray-900' : ''}`}
        >
          Join
        </button>
      </form>
      <p className="text-left text-sm">
        By entering your email, you agree to our Terms of Use & Privacy Policy,
        including receipt of emails and promotions. You can unsubcribe at any
        time.
      </p>
    </div>
  );
}
