// utils/supabase.ts
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { mmkvAdapter } from './storage';

const supabaseUrl = process.env.EXPO_PUBLIC_PROJECT_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_ANON_KEY!;

// Client-side only Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null;

export const getSupabase = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: mmkvAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }
  return supabaseClient;
};