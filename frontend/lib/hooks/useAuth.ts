import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function useAuth(requireAuth = true) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get('access_token');
    const authStatus = Boolean(token);
    setIsAuthenticated(authStatus);

    if (requireAuth && !authStatus) {
      router.replace('/login');
    }
  }, [requireAuth, router]);

  return { isAuthenticated, token: Cookies.get('access_token') };
}

