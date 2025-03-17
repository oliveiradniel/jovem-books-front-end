import { createContext } from 'react';

interface AuthContextValue {
  signedIn: boolean;
  signIn: (accessToken: string) => void;
}

export const AuthContext = createContext({} as AuthContextValue);
