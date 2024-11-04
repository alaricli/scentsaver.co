'use client';

import { useEffect } from 'react';

export default function AccountPage() {
  useEffect(() => {
    window.location.href = 'https://www.scentsaver.co/account';
  }, []);

  return (
    <div>
      <p>Redirecting to your account...</p>
    </div>
  );
}
