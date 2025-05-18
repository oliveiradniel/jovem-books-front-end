import { createContext } from 'react';

import { IUserAPIResponse } from '../../@types/User';

interface AuthContextValue {
  user: IUserAPIResponse | null;
  isLoadingUser: boolean;
  isRefetchingUser: boolean;
  updateUser: (user: IUserAPIResponse) => void;
  signedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);
