import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { LoginCredentials, LoginResponse, LoginData } from "@/types/auth";
import { mockLoginResponse } from "@/static/auth";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
  user: () => [...authKeys.all, "user"] as const,
} as const;

// Simulated API functions
const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Basic validation - in real app, this would be handled by backend
    if (!credentials.accessKey || !credentials.secretKey) {
      throw new Error("Access Key and Secret Key are required");
    }

    return mockLoginResponse;
  },

  validateSession: async (): Promise<LoginData | null> => {
    await new Promise((resolve) => setTimeout(resolve, 50)); // Reduced for faster auth checks

    // Check if we have stored auth data
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nebula-auth");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Check if token is expired
          if (parsed.expiration && Date.now() < parsed.expiration) {
            return parsed;
          }
        } catch {
          // Invalid stored data
        }
      }
    }
    return null;
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (typeof window !== "undefined") {
      localStorage.removeItem("nebula-auth");
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
      // Store auth data
      if (typeof window !== "undefined") {
        localStorage.setItem("nebula-auth", JSON.stringify(data.data));
      }

      // Update session cache
      queryClient.setQueryData(authKeys.session(), data.data);

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
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

      // Redirect to login
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
