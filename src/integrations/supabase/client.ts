// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aysgztkloyhchntjuxgt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5c2d6dGtsb3loY2hudGp1eGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjMyNDcsImV4cCI6MjA2NzYzOTI0N30.xTgijfHaOkPFJBMM_nGPJ4fj5O8Bk8Lyr0-rhku3Kpo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});