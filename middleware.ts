import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("Bearer")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
