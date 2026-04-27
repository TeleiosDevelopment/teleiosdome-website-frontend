// middleware.ts
import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
    const user = request.cookies.get('user')?.value;
    const role = request.cookies.get('role')?.value.toLowerCase();

    const publicPaths = ['/admin/login', '/admin/api/users/login'];
    const pathname = request.nextUrl.pathname;
    if (publicPaths.includes(pathname) || pathname.startsWith('/admin/api')) {
      return NextResponse.next();
    }

    if (pathname === '/admin/login' && user) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    if (pathname.startsWith('/admin') && !user) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Restrict receptionist from accessing admin-only pages
    const adminOnly = ['/admin/users', '/admin/simulators', '/admin/events', '/admin/hours-closure'];
    if (adminOnly.some(path => pathname.startsWith(path)) && role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};