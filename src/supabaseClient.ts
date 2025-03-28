import { createClient } from '@supabase/supabase-js'

const VITE_SUPABASE_URL="https://qftqouhezpcngcjtgjfi.supabase.co"
const VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmdHFvdWhlenBjbmdjanRnamZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MDY3NzQsImV4cCI6MjA1ODA4Mjc3NH0.sFxh7YrgoHMvQuoIx2IQg_RiWsYMfgQbqlGBAfqPA-E"

const supabaseUrl = VITE_SUPABASE_URL
const supabaseAnonKey = VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)