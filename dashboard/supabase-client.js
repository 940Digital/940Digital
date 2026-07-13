import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const SUPABASE_URL = "https://vcivhrzdvwkqebevplgs.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjaXZocnpkdndrcWViZXZwbGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5MDAwOTMsImV4cCI6MjA5OTQ3NjA5M30.7o6QE7P7J2eghONnuOduGL9GjD6GbY2Vf7gKOuGkuyw";
export const SUPPORT_EMAIL = "0nleiter@gmail.com";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});
