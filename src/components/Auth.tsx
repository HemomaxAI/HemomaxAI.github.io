import { Navigate, Outlet } from 'react-router'
import { createContext, useContext, useEffect, useState } from 'react'

import { Session } from '@supabase/supabase-js'
import { supabase } from '../supabaseClient'

const AuthContext = createContext<AuthContextType>({
  session: null,
  isAuthenticated: false,
});

interface AuthContextType {
  session: Session | null;
  isAuthenticated: boolean;
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

  return (
    <AuthContext.Provider value={{session, isAuthenticated}}>
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
  return isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};