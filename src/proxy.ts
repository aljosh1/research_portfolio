import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Optimistic gate: unauthenticated visitors never reach admin pages.
// Every page and server action re-checks the session against the database as well.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get("admin_session")?.value;
  const secret = process.env.AUTH_SECRET;
  if (token && secret) {
    try {
      await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: ["HS256"] });
      const response = NextResponse.next();
      response.headers.set("Cache-Control", "no-store");
      return response;
    } catch {
      // fall through to redirect
    }
  }
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = { matcher: ["/admin/:path*"] };
