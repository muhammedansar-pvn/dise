import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Guard all pages inside /admin (except /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionToken = request.cookies.get('admin_session')?.value;
    const isValid = await verifySession(sessionToken);

    if (!isValid) {
      // Use clean standard absolute URL to redirect, avoiding Vercel internal proxy routing conflicts
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 2. Guard admissions API management endpoints
  if (pathname.startsWith('/api/admissions')) {
    // Note: Public users MUST be allowed to submit applications (POST /api/admissions).
    // All other operations (GET, PATCH, DELETE) are restricted to authenticated admins.
    if (request.method !== 'POST') {
      const sessionToken = request.cookies.get('admin_session')?.value;
      const isValid = await verifySession(sessionToken);

      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized administrative access' },
          { status: 401 }
        );
      }
    }
  }

  // 3. Guard admin settings modifications (allow GET publicly, protect POST/PATCH)
  if (pathname.startsWith('/api/admin/settings')) {
    if (request.method !== 'GET') {
      const sessionToken = request.cookies.get('admin_session')?.value;
      const isValid = await verifySession(sessionToken);

      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized administrative access' },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admissions',
    '/api/admissions/:path*',
    '/api/admin/settings',
  ],
};
