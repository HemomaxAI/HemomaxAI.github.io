import { Session, User } from '@supabase/supabase-js'
import { createContext, useContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export interface AuthContextType {
  session: Session | null;
  isAuthenticated: boolean;
  logout: () => void;
  loading: boolean;
  user: User | null;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
