import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LoginCredentials, LoginResponse, LoginData } from "@/types/auth";
import { authService } from "@/lib/services/auth";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
  user: () => [...authKeys.all, "user"] as const,
} as const;

// Real API functions
const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await authService.login({
      accessKey: credentials.accessKey,
      secretKey: credentials.secretKey,
    });

    // Set session token in API client and storage
    if (response.data?.sessionToken && typeof window !== "undefined") {
      authService.setSessionToken(response.data.sessionToken);
      // Store additional auth data for session validation
      localStorage.setItem(
        "authData",
        JSON.stringify({
          accessKeyId: response.data.accessKeyId,
          expiration: response.data.expiration,
        })
      );
    }

    return response;
  },

  validateSession: async (): Promise<LoginData | null> => {
    if (typeof window === "undefined") return null;

    const sessionToken = localStorage.getItem("sessionToken");
    const authDataStr = localStorage.getItem("authData");

    if (!sessionToken || !authDataStr) return null;

    try {
      const authData = JSON.parse(authDataStr);

      // Check if token is expired
      if (!authData.expiration || Date.now() / 1000 >= authData.expiration) {
        authService.logout();
        return null;
      }

      // Validate session with API
      const validation = await authService.validateSession(
        authData.accessKeyId
      );
      if (validation.data === true) {
        return {
          ...authData,
          sessionToken,
          region: "ap-south-1",
        };
      }

      // Session validation failed
      authService.logout();
      return null;
    } catch {
      // Invalid stored data
      authService.logout();
      return null;
    }
  },

  logout: async (): Promise<void> => {
    authService.logout();
    if (typeof window !== "undefined") {
      localStorage.removeItem("authData");
    }
  },
};

// Hook for authentication state
export function useAuth() {
  const [isInitialized, setIsInitialized] = useState(false);

  // Query to check session
  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: authKeys.session(),
    queryFn: authApi.validateSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Set initialized flag after first load
  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  const isAuthenticated = !!session;

  return {
    session,
    isAuthenticated,
    isLoading: isLoading || !isInitialized,
    error,
  };
}

// Login mutation hook
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Update session cache
      queryClient.setQueryData(authKeys.session(), data.data);

      // Show success toast with API message
      toast.success(data.message ?? "Login successful");

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      console.error("Login failed:", error);
      // Show error toast with API message or fallback
      let errorMessage = "Login failed";

      if (error && typeof error === "object") {
        const apiError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage =
          apiError.response?.data?.message ??
          apiError.message ??
          "Login failed";
      }

      toast.error(errorMessage);
    },
  });
}

// Logout mutation hook
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();

      // Show success toast
      toast.success("Logged out successfully");

      // Redirect to login
      router.push("/auth/login");
    },
    onError: (error: unknown) => {
      console.error("Logout failed:", error);
      // Show error toast
      toast.error("Failed to logout properly");

      // Still redirect to login even if logout API fails
      queryClient.clear();
      router.push("/auth/login");
    },
  });
}

// Hook for protecting routes
export function useAuthGuard(redirectTo = "/auth/login") {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  return {
    isAuthenticated,
    isLoading,
  };
}

// Hook for guest-only routes (redirect if authenticated)
export function useGuestGuard(redirectTo = "/dashboard") {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  return {
    isAuthenticated,
    isLoading,
  };
}
