import { createClient } from "@supabase/supabase-js";
import config from "./config";
import { Database } from "./database.generated";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  config.VITE_PUBLIC_SUPABASE_PROJECT_URL,
  config.VITE_PUBLIC_SUPABASE_PUBLIC_ANON_KEY
);

export default supabase;
