import { useCallback, useEffect, useState } from 'react';

import { AuthContext } from './AuthContext';

import { env } from '../../config/env';

import UsersService, { UserAPIResponse } from '../services/UsersService';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAPIResponse | null>(null);
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storagedAccessToken = localStorage.getItem(env.ACCESS_TOKEN_KEY);

    return !!storagedAccessToken;
  });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(env.ACCESS_TOKEN_KEY, accessToken);

    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(env.ACCESS_TOKEN_KEY);

    setSignedIn(false);
  }, []);

  const getUser = useCallback(async () => {
    try {
      const userData = await UsersService.getMe();

      setUser(userData);
    } catch {
      signOut();
    }
  }, [signOut]);

  useEffect(() => {
    if (signedIn) {
      getUser();
    }
  }, [signedIn, getUser]);

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
