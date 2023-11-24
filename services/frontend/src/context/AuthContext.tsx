import { getAccessTokenFromCookie } from '@/utils/cookies';
import { isTokenExpired } from '@/utils/jwt';
import { useRouter } from 'next/navigation';

import { createContext, ReactNode, useState } from 'react';

import { useEffect } from 'react';

const AuthContext = createContext({ isUserAuthenticated: false });

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const accessToken = getAccessTokenFromCookie();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!accessToken);

  const handleToken = async () => {
    if (!accessToken) {
      setIsUserAuthenticated(false);
      return;
    }

    const { verifyToken } = await import('@/networks');

    const response = await verifyToken(accessToken);

    if (!response || isTokenExpired(response, 48)) {
      setIsUserAuthenticated(false);
    } else {
      setIsUserAuthenticated(true);
    }
  };

  useEffect(() => {
    handleToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (isUserAuthenticated) {
      router.push('/dashboard');
      return;
    }
    router.push('/');
  }, [isUserAuthenticated, router]);

  return (
    <AuthContext.Provider value={{ isUserAuthenticated: isUserAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
