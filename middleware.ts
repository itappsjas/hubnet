import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public paths yang tidak memerlukan authentication
const publicPaths = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/verify-mfa',
  '/splash',
  '/',
]

// Role-based access control untuk setiap path
const roleBasedPaths: Record<string, string[]> = {
  '/user': ['admin'], // Hanya admin yang bisa akses user management
  '/report': ['admin', 'view', 'airline'], // Semua role bisa akses report
  '/airline': ['admin', 'view'], // Admin dan view bisa akses airline list
  '/airline_flight': ['admin', 'view', 'airline'], // Semua role bisa akses airline flights
  '/airline_detail': ['admin', 'view', 'airline'], // Semua role bisa akses airline detail
  '/dashboard': ['admin', 'view', 'airline'], // Semua role bisa akses dashboard
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Get user data from cookies or headers
  // Since localStorage is client-side only, we'll redirect to login and let client-side handle it
  // For better security, you should implement JWT tokens in cookies
  
  // Check if trying to access protected route
  const isProtectedRoute = Object.keys(roleBasedPaths).some(path => 
    pathname.startsWith(path)
  )

  if (isProtectedRoute || pathname.startsWith('/dashboard')) {
    // We can't check localStorage here (server-side)
    // So we'll pass the request and let client-side components handle the auth check
    // But we add a header to indicate this is a protected route
    const response = NextResponse.next()
    response.headers.set('x-protected-route', 'true')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp).*)',
  ],
}
