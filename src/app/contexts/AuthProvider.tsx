import { useCallback, useState } from 'react';

import { AuthContext } from './AuthContext';

import { env } from '../../config/env';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storagedAccessToken = localStorage.getItem(env.ACCESS_TOKEN_KEY);

    return !!storagedAccessToken;
  });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(env.ACCESS_TOKEN_KEY, accessToken);

    setSignedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
