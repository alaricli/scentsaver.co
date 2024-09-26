import { useEffect } from 'react';

export default function ProtectedPage() {
  useEffect(() => {
    const token = localStorage.getItem('customerAccessToken');
    if (!token) {
      // Redirect to login if the user is not authenticated
      window.location.href = '/login';
    }
  }, []);

  return <div>This is a protected page.</div>;
}
