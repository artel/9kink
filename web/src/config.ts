import { z } from "zod";

const configurationSchema = z.object({
  VITE_PUBLIC_SUPABASE_PUBLIC_ANON_KEY: z.string(),
  VITE_PUBLIC_SUPABASE_PROJECT_URL: z.string(),
});

export default configurationSchema.parse(import.meta.env);
