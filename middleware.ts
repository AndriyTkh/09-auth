import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { getAuthSessionServer } from './lib/api/serverApi';

const publicRoutes = ['/sign-in', '/sign-up'];
const privateRoutes = ['/profile', '/notes'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (!accessToken && refreshToken) {
    try {
      const data = await getAuthSessionServer();
      const setCookie = data?.headers['set-cookie'];

      if (setCookie) {
        const res = NextResponse.next();
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          if (parsed.accessToken) {
            res.cookies.set('accessToken', parsed.accessToken, {
              path: parsed.Path || '/',
              maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            });
          }
          if (parsed.refreshToken) {
            res.cookies.set('refreshToken', parsed.refreshToken, {
              path: parsed.Path || '/',
              maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            });
          }
        }
        return res;
      }
    } catch (err) {
      console.error('Session refresh failed:', err);
    }
  }

  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
