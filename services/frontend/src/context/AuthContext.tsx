import { verifyToken } from '@/networks';
import { getAccessTokenFromCookie } from '@/utils/cookies';
import { isTokenExpired } from '@/utils/jwt';
import { useRouter } from 'next/navigation';

import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const accessToken = getAccessTokenFromCookie();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!accessToken);

  const handleToken = async () => {
    if (!accessToken) {
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
    router.push('/login');
  }, [isUserAuthenticated, router]);

  return (
    <Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
