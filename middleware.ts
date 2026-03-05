/**
 * middleware.ts  (root of the project – next to package.json)
 *
 * Protects every route under /admin/* (except /admin/login) by verifying
 * the Supabase session stored in the request cookies.
 *
 * If the visitor is unauthenticated they are redirected to /admin/login.
 * If an authenticated user tries to access /admin/login they are
 * redirected to /admin/dashboard.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// Routes that do NOT require authentication
const PUBLIC_ADMIN_ROUTES = ['/admin/login']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Only run for /admin/* routes ────────────────────────────────────────
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // ── Build a mutable response so Supabase can refresh the session cookie ─
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  // ── Create a server-side Supabase client scoped to this request ──────────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Write the refreshed cookie to both the request and response
          request.cookies.set({ name, value, ...options })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // ── Refresh session (also rotates the access token if expired) ───────────
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAuthenticated   = !!session
  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.includes(pathname)

  // ── Unauthenticated → redirect to login ──────────────────────────────────
  if (!isAuthenticated && !isPublicAdminRoute) {
    const loginUrl = new URL('/admin/login', request.url)
    // Preserve the originally requested URL so we can redirect back after login
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── Already authenticated → redirect away from login page ────────────────
  if (isAuthenticated && isPublicAdminRoute) {
    const dashboardUrl = new URL('/admin/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return response
}

// ── Route matcher ────────────────────────────────────────────────────────────
export const config = {
  matcher: [
    /*
     * Match all /admin/* paths.
     * Exclude Next.js internals and static files so the middleware
     * doesn't add unnecessary overhead.
     */
    '/admin/:path*',
  ],
}
