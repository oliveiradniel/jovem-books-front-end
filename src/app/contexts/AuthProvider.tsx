import { useCallback, useEffect, useState } from 'react';

import { AuthContext } from './AuthContext';

import { env } from '../../config/env';

import { emitToast } from '../../utils/emitToast';

import UsersService from '../services/UsersService';

import { IUserAPIResponse } from '../../@types/User';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserAPIResponse | null>(null);
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
      emitToast({
        type: 'error',
        message:
          'Não foi possível encontrar seu usuário. Tente novamente mais tarde.',
      });

      signOut();
    }
  }, [signOut]);

  const updateUser = useCallback((user: IUserAPIResponse) => {
    setUser(user);
  }, []);

  useEffect(() => {
    if (signedIn) {
      getUser();
    }
  }, [signedIn, getUser]);

  return (
    <AuthContext.Provider
      value={{ signedIn, signIn, signOut, user, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
