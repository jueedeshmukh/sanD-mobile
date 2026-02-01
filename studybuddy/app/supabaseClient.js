import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://acodtptjskvybcifxniz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjb2R0cHRqc2t2eWJjaWZ4bml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MDg0MTQsImV4cCI6MjA4NTQ4NDQxNH0.0baFgmSKCBY4xmhV5cNfiKndD0_aZqX4eW2HweqwXn8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})