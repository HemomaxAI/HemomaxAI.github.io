import { Navigate, Outlet } from 'react-router'
import { useEffect, useState } from 'react'

import Root from '../Root';
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../../supabaseClient'
import { AuthContext, useAuth } from './auth-utils';

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (error) {
        console.log(error);
        return;
      }

      setSession(initialSession);
      setUser(initialSession?.user || null);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });
  }, [])

  const isAuthenticated = !!session?.access_token;

  const logout = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{session, isAuthenticated, logout, loading, user}}>
      {children}
    </AuthContext.Provider>
  );

}

export function Protected() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  } else if (isAuthenticated) {
    return <Root><Outlet /></Root>;
  } else {
    return  <Navigate to="/hemomax/" />;
  }
};
