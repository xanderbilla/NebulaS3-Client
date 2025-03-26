import { toast } from "sonner";

interface LoginCredentials {
  accessKey: string;
  secretKey: string;
  region: string;
}

export function useAuth() {
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "SUCCESS" && data.data.sessionToken) {
        document.cookie = `sessionToken=${data.data.sessionToken}; path=/; Secure; SameSite=Strict`;
        toast.success("Login successful!");
        return true;
      } else {
        toast.error(data.message || "Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Failed to validate credentials");
      return false;
    }
  };

  const logout = () => {
    document.cookie =
      "sessionToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  return {
    login,
    logout,
  };
}
