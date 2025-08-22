import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const publicRoutes = ["/sign-in", "/sign-up"];
const privateRoutes = ["/profile", "/notes"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  // If no access token but refresh token exists, try refresh
  if (!accessToken && refreshToken) {
    try {
      const data = await checkServerSession();
      const setCookie = data?.headers["set-cookie"];

      if (setCookie) {
        const res = NextResponse.next();
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          if (parsed.accessToken) {
            res.cookies.set("accessToken", parsed.accessToken, {
              path: parsed.Path || "/",
              maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            });
          }
          if (parsed.refreshToken) {
            res.cookies.set("refreshToken", parsed.refreshToken, {
              path: parsed.Path || "/",
              maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            });
          }
        }
        return res;
      }
    } catch (err) {
      console.error("Session refresh failed:", err);
    }
  }

  // Not logged in
  if (!accessToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  // Already logged in → block access to sign-in / sign-up
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
