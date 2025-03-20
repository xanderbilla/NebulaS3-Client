"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Simple toast implementation to avoid importing the full library
const toast = {
  success: (message: string) => {
    console.log("✅ Success:", message);
    // You could implement a minimal toast notification here if needed
  },
  error: (message: string) => {
    console.error("❌ Error:", message);
    // You could implement a minimal toast notification here if needed
  },
};

// Define minimal types inline to avoid importing from service
type LoginCredentials = {
  accessKey: string;
  secretKey: string;
  region?: string;
};

type LoginResponse = {
  status: string;
  message?: string;
  data?: {
    sessionToken: string;
    accessKeyId: string;
  };
};

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);

    try {
      // Use server action instead of direct API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (data.status === "SUCCESS" && data.data?.sessionToken) {
        document.cookie = `sessionToken=${data.data.sessionToken}; path=/; Secure; SameSite=Strict`;
        document.cookie = `accessKey=${data.data.accessKeyId}; path=/; Secure; SameSite=Strict`;

        toast.success(data.message ?? "Login successful!");
        setIsRedirecting(true);
        router.push("/dashboard");
        return data;
      } else {
        toast.error(data.message ?? "Invalid credentials");
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to validate credentials");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    isRedirecting,
  };
}
