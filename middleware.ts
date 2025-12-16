import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role as 'TRAINER' | 'CLIENT' | undefined;
    const path = req.nextUrl.pathname;

    if (path.startsWith('/trainer') && role !== 'TRAINER') {
      return NextResponse.redirect(new URL('/client/hoy', req.url));
    }

    if (path.startsWith('/client') && role !== 'CLIENT') {
      return NextResponse.redirect(new URL('/trainer', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/trainer/:path*', '/client/:path*'],
};
