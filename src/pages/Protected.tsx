import { Navigate, Outlet } from 'react-router'
import { useEffect, useState } from 'react'

import { Session } from '@supabase/supabase-js'
import { supabase } from '../supabaseClient'

function Protected() {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session)
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session)
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  return session?.access_token ? <Outlet /> : <Navigate to='/' />;
}

export default Protected;
