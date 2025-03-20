import { NextResponse } from "next/server";
import { checkHealth } from "@/services/healthService";

// This keeps the API base URL away from client-side code
export async function GET() {
  try {
    // Use the healthService to make the actual API call
    const response = await checkHealth();

    return NextResponse.json(response);
  } catch (error) {
    console.error("Health check API route error:", error);
    return NextResponse.json(
      { status: "FAILED", message: "Service health check failed" },
      { status: 500 }
    );
  }
}
