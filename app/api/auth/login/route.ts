import { NextResponse } from "next/server";
import { login, LoginCredentials } from "@/services/authService";

// This keeps the API base URL away from client-side code
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const credentials: LoginCredentials = body;

    // Use the authService to make the actual API call
    const response = await login(credentials);

    return NextResponse.json(response);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { status: "ERROR", message: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
