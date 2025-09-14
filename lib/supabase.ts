import { createClient } from '@supabase/supabase-js';

// This function will create a new Supabase client on demand
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // This check ensures that if the variables are missing at runtime, you get a clear error.
    throw new Error("Supabase URL or anonymous key is not set in environment variables.");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};