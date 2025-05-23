// Bogdan
import { createContext } from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  username: string;
  setUsername: (name: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    username: '',
    setUsername: () => {},
});