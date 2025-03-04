import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;

    if (!sessionToken) {
      console.error("No session token found in cookies");
      return false;
    }

    const response = await fetch(`${API_BASE_URL}/auth/validate-session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Session-Token": sessionToken,
      },
    });

    const data = await response.json();
    return response.ok && data.status === "SUCCESS";
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}
