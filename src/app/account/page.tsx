'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function ProtectedPage() {
  const { isLoggedIn, logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    const token = Cookies.get('customerAccessToken');
    if (!token) {
      router.push('/signin');
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div>
        <p>
          Welcome to your account, you should only be able to access here upon
          sign in
        </p>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="border-2 border-solid border-sky-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
