import { NextRequest, NextResponse } from "next/server";

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard", "/buckets"];

// Define public routes that should redirect if authenticated
const publicRoutes = ["/auth/login"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add performance and security headers
  const response = NextResponse.next();
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Cache static assets
  if (pathname.startsWith("/static") || pathname.includes(".")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  }

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if current path is a public route (like login)
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Get session token from cookies (if available) or check for it in headers
  const sessionToken = request.cookies.get("sessionToken")?.value;

  // For protected routes, redirect to login if no session token
  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // For public routes (login), redirect to dashboard if already authenticated
  if (isPublicRoute && sessionToken) {
    const redirectResponse = NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
    // Add headers to redirect response too
    redirectResponse.headers.set("X-DNS-Prefetch-Control", "on");
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
