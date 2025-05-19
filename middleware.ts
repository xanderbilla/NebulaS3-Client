import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtected = path.startsWith("/dashboard");
  const isPublic = path === "/auth/login";

  const user = await isAuthenticated();

  if (isProtected && !user) {
    return NextResponse.redirect(
      new URL("/auth/login", req.nextUrl).toString()
    );
  }

  if (isPublic && user) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl).toString());
  }

  return NextResponse.next();
}
