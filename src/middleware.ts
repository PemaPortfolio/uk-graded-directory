/**
 * Middleware for Route Protection (Spec 04)
 *
 * Protects dashboard and account routes, redirecting
 * unauthenticated users to login.
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes that require authentication
// Note: /business/add and /business/help are public, only /dashboard needs auth
const protectedPaths = ['/dashboard', '/account']

// Routes that should redirect to dashboard if already authenticated
const authOnlyPaths = ['/login']

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Get the current session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Check if this is a protected path
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  // Check if this is an auth-only path (like /login)
  const isAuthOnlyPath = authOnlyPaths.some((path) => pathname.startsWith(path))

  // Redirect unauthenticated users from protected routes
  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('returnTo', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from login page
  if (isAuthOnlyPath && user) {
    const returnTo = request.nextUrl.searchParams.get('returnTo') || '/dashboard'
    const url = request.nextUrl.clone()
    url.pathname = returnTo
    url.searchParams.delete('returnTo')
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
