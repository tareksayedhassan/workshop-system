import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/api/Login") {
    return NextResponse.next();
  }
  const res = NextResponse.next();
  if (pathname.startsWith("/api/")) {
    res.headers.set("Access-Control-Allow-Origin", "https://auto-lap.online");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: res.headers });
    }
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/api")) {
    const token = req.cookies.get("Bearer")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
