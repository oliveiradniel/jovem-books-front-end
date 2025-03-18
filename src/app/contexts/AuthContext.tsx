import { createContext } from 'react';

import { UserResponse } from '../services/usersService';

interface AuthContextValue {
  user: UserResponse | null;
  signedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);
