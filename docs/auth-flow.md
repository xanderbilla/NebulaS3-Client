# Authentication Flow

This document explains the secure authentication flow implemented in the application.

## Authentication Architecture

1. **Client-Side Authentication Hook (`useAuth.ts`)**

   - Located in `lib/hooks/useAuth.ts`
   - Provides a React hook interface for authentication functions
   - Makes requests to internal Next.js API routes, not directly to external APIs
   - Handles UI states (loading, redirecting) and manages cookies

2. **API Route (`/api/auth/login/route.ts`)**

   - Serves as a secure intermediary between the client and the external API
   - Uses server-side environment variables to access the API
   - Prevents API URLs and sensitive values from being exposed to the client

3. **Auth Service (`authService.ts`)**
   - Server-side utility for making actual API calls
   - Used only by API routes, not directly from the client
   - Uses server-side environment variables (not prefixed with NEXT*PUBLIC*)

## Health Check Architecture

1. **Client-Side Health Check Hook (`useHealthCheck.ts`)**

   - Located in `lib/hooks/useHealthCheck.ts`
   - Provides a React hook interface for health checking
   - Makes requests to internal Next.js API routes, not directly to external APIs
   - Handles interval polling and UI states

2. **API Route (`/api/health/route.ts`)**

   - Serves as a secure intermediary for health checks
   - Uses server-side environment variables to access the API
   - Prevents API URLs from being exposed to the client

3. **Health Service (`healthService.ts`)**
   - Server-side utility for making health check API calls
   - Used only by API routes, not directly from the client
   - Uses server-side environment variables (not prefixed with NEXT*PUBLIC*)

## Environment Variables

The application uses two types of environment variables:

- **Server-side only** (e.g., `API_BASE_URL`): Not exposed to the browser
- **Client-side** (prefixed with `NEXT_PUBLIC_`): Available in browser code

## Security Benefits

- API endpoints are not exposed to the client
- Authentication credentials only travel between the browser and your application server
- Server-side environment variables are kept private
- Better separation of concerns between UI components and data fetching
- Consistent error handling patterns across the application
# Authentication Flow

This document describes the authentication flow for the application.
