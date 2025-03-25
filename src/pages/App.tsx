import { useEffect, useState } from 'react'

import Authenticated from './Authenticated'
import Home from './Home'
import { Session } from 'react-router'
import { supabase } from '../supabaseClient'

function App() {
  const [session, setSession] = useState<Session | null>(null)
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
  if (!session) {
    return (Home)
  }
  else {
    return (<Authenticated session={session}></Authenticated>)
  }


}

export default App
