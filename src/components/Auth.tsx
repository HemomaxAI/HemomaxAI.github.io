import { Navigate, Outlet } from 'react-router'
import { createContext, useContext, useEffect, useState } from 'react'

import Root from './Root';
import { Session } from '@supabase/supabase-js'
import { supabase } from '../supabaseClient'

const AuthContext = createContext<AuthContextType>({
  session: null,
  isAuthenticated: false,
  logout: () => {}
});

interface AuthContextType {
  session: Session | null;
  isAuthenticated: boolean;
  logout: () => void;
}

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const isAuthenticated = !!session?.access_token;

  const logout = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{session, isAuthenticated, logout}}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function Protected() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Root><Outlet /></Root> : <Navigate to="/hemomax/" />;
};