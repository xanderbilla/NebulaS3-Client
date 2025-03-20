import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;
    const accessKey = cookieStore.get("accessKey")?.value;

    if (!sessionToken || !accessKey) {
      console.error("No session token or access key found in cookies");
      return false;
    }

    const response = await fetch(`${API_BASE_URL}/auth/validate-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-Token": sessionToken,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      body: JSON.stringify({ accessKey }),
      cache: "no-store",
    });

    const data = await response.json();
    return response.ok && data.status === "SUCCESS";
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}
