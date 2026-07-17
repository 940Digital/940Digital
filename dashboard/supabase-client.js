import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const SUPABASE_URL = "https://yyfeymmjdlewvdxrzggn.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZmV5bW1qZGxld3ZkeHJ6Z2duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNjgzMTAsImV4cCI6MjA5OTY0NDMxMH0.b8RsQGDemcf0dvpSQyw6nsuR5crkG05lILz1F4BNqHY";
export const SUPPORT_EMAIL = "940digital@gmail.com";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
  global: {
    // Force every request (auth + data) to bypass any HTTP cache — dashboard
    // numbers and session state must never be served stale.
    fetch: (url, options = {}) => fetch(url, { ...options, cache: "no-store" }),
  },
});
