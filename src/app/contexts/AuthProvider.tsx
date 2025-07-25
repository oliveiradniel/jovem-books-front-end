import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useQueryGetUser } from '../hooks/queries/user/useQueryGetUser';

import { AuthContext } from './AuthContext';

import { AxiosError } from 'axios';

import { env } from '../../config/env';

import { emitToast } from '../../utils/emitToast';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storagedAccessToken = localStorage.getItem(env.ACCESS_TOKEN_KEY);

    return !!storagedAccessToken;
  });

  const { user, userError, isLoadingUser, isRefetchingUser, isError } =
    useQueryGetUser({
      enabled: signedIn,
    });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(env.ACCESS_TOKEN_KEY, accessToken);

    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(env.ACCESS_TOKEN_KEY);

    queryClient.clear();

    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (userError) {
      if (userError instanceof AxiosError) {
        const errorMessage = userError.response?.data.message as string;

        if (errorMessage && errorMessage.includes('Invalid access token')) {
          signOut();

          emitToast({
            type: 'error',
            message: 'Suas credenciais expiraram! Faça login novamente.',
          });

          return;
        }
      }
    }

    if (isError) {
      emitToast({
        type: 'error',
        message:
          'Não foi possível encontrar seu usuário. Tente novamente mais tarde.',
      });

      signOut();
    }
  }, [signOut, userError, isError]);

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        signIn,
        signOut,
        user,
        isLoadingUser,
        isRefetchingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
