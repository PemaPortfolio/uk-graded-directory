import { createBrowserClient } from '@supabase/ssr'

/**
 * Create a Supabase client for browser/client components
 *
 * Use this in Client Components that need to access Supabase.
 * The client uses a singleton pattern, so you only create one instance.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
