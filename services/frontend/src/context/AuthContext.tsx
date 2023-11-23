import { getAccessTokenFromCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';

import { createContext, ReactNode, useState } from 'react';

import { useEffect } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const accessToken = getAccessTokenFromCookie();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!accessToken);

  if (router.isFallback) {
    <h1>Loading...</h1>;
  }

  const handleToken = async () => {
    if (!accessToken) {
      console.log(isUserAuthenticated);
      setIsUserAuthenticated(false);
      return;
    }

    const response = await verifyToken(accessToken);

    if (!response || isTokenExpired(response, 48)) {
      setIsUserAuthenticated(false);
    } else {
      setIsUserAuthenticated(true);
    }
  };

  useEffect(() => {
    handleToken();
  }, [accessToken]);

  useEffect(() => {
    if (isUserAuthenticated) {
      router.push('/dashboard');
      return;
    }
    router.push('/');
  }, [isUserAuthenticated, router]);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}
