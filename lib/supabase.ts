/**
 * lib/supabase.ts
 *
 * Exports two Supabase clients:
 *  - `supabaseBrowser` – for use in Client Components (singleton, reuses session from cookies).
 *  - `createSupabaseServer` – for use in Server Components / Route Handlers / Middleware
 *    (new instance per request so cookies are scoped correctly).
 *
 * Environment variables required (.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...   ← only used server-side when needed
 */

import { createBrowserClient } from '@supabase/ssr'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

// ─── Environment helpers ──────────────────────────────────────────────────────

function getEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(
      `Missing environment variable: "${key}". ` +
        `Add it to .env.local and restart the dev server.`
    )
  }
  return value
}

// ─── Browser Client (Client Components) ──────────────────────────────────────

/**
 * A singleton Supabase client for use in Client Components.
 * Reads/writes the auth session from browser cookies automatically.
 */
export const supabaseBrowser = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ─── Server Client (Server Components / Route Handlers) ──────────────────────

/**
 * Creates a Supabase client for Server Components, Server Actions, or
 * Route Handlers. Must be called inside a request context because it reads
 * from the Next.js `cookies()` store.
 *
 * @example
 * // app/some-page/page.tsx
 * import { createSupabaseServer } from '@/lib/supabase'
 * const supabase = createSupabaseServer()
 * const { data } = await supabase.from('projects').select('*')
 */
export function createSupabaseServer() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // `set` throws in Server Components – safe to ignore here;
            // the Middleware is responsible for refreshing the session cookie.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // Same as above.
          }
        },
      },
    }
  )
}

// ─── Admin / Service-Role Client (server-only, privileged) ───────────────────

/**
 * Creates a Supabase client with the service-role key.
 * NEVER expose this to the browser – only use in trusted server-side code.
 *
 * @example
 * // app/api/admin/route.ts
 * import { createSupabaseAdmin } from '@/lib/supabase'
 * const supabase = createSupabaseAdmin()
 */
export function createSupabaseAdmin() {
  return createServerClient<Database>(
    getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    getEnv('SUPABASE_SERVICE_ROLE_KEY'),
    {
      cookies: {
        get: () => undefined,
        set: () => {},
        remove: () => {},
      },
    }
  )
}
