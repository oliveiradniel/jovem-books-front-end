import { createContext } from 'react';

import { UserAPIResponse } from '../services/UsersService';

interface AuthContextValue {
  user: UserAPIResponse | null;
  signedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);
