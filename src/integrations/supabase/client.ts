import * as Supabase from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://nupcsauyhkauqxdlvwsp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51cGNzYXV5aGthdXF4ZGx2d3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5OTYwNDEsImV4cCI6MjA5NzU3MjA0MX0.4ytKp7M4mnPwoFfQ3QEfpA9NPzG_HtKwwg81DoxYlvw';

export const supabase = Supabase.createClient<Database>(supabaseUrl, supabaseAnonKey)
