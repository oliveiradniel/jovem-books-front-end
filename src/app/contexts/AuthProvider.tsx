import { useCallback, useEffect, useState } from 'react';

import { useQueryGetUser } from '../hooks/queries/user/useQueryGetUser';

import { AuthContext } from './AuthContext';

import { env } from '../../config/env';

import { emitToast } from '../../utils/emitToast';

import { IUserAPIResponse } from '../../@types/User';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userData, isLoadingUser, isError, refetch } = useQueryGetUser();

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
    refetch();
  }, [refetch]);

  const updateUser = useCallback((user: IUserAPIResponse) => {
    setUser(user);
  }, []);

  useEffect(() => {
    if (signedIn) {
      getUser();
    }

    if (userData) {
      setUser(userData as IUserAPIResponse);
    }

    if (isError) {
      emitToast({
        type: 'error',
        message:
          'Não foi possível encontrar seu usuário. Tente novamente mais tarde.',
      });

      signOut();
    }
  }, [signedIn, userData, isError, signOut, getUser]);

  return (
    <AuthContext.Provider
      value={{ signedIn, signIn, signOut, user, isLoadingUser, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
