const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

/**
 * Helper function to get sessionToken from cookies.
 */
function getSessionToken(): string | null {
  const cookies = document.cookie.split("; ");
  const sessionCookie = cookies.find((cookie) =>
    cookie.startsWith("sessionToken=")
  );

  return sessionCookie ? sessionCookie.split("=")[1] : null;
}

/**
 * Fetches the list of S3 buckets.
 * Requires sessionToken in the request header.
 */
export async function fetchBuckets() {
  const sessionToken = getSessionToken();

  if (!sessionToken) {
    throw new Error("No session token found. Please log in.");
  }

  const res = await fetch(`${API_BASE_URL}/s3/buckets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      sessionToken: sessionToken,
    },
    credentials: "include",
  });

  const data = await res.json();

  if (data.status !== "SUCCESS") {
    throw new Error(`Failed to fetch buckets: ${data.message}`);
  }

  return data;
}

/**
 * Creates a new S3 bucket.
 * Requires sessionToken in the request header.
 */
export async function createBucket(bucketName: string) {
  const sessionToken = getSessionToken();

  if (!sessionToken) {
    throw new Error("No session token found. Please log in.");
  }

  const res = await fetch(`${API_BASE_URL}/s3/createBucket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      sessionToken: sessionToken, // Pass session token as expected in the API header
    },
    credentials: "include",
    body: JSON.stringify({ bucketName }),
  });

  return res.json();
}

export async function deleteBucket(bucketName: string) {
  const sessionToken = getSessionToken();

  if (!sessionToken) {
    throw new Error("No session token found. Please log in.");
  }

  const res = await fetch(`${API_BASE_URL}/s3/deleteBucket`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      sessionToken: sessionToken,
    },
    credentials: "include",
    body: JSON.stringify({ bucketName }),
  });

  return res.json();
}

export async function logoutUser() {
  const sessionToken = getSessionToken();
  if (!sessionToken) {
    throw new Error("No session token found. Cannot logout.");
  }

  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      sessionToken: sessionToken,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.statusText}`);
  }

  document.cookie =
    "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  return response.json();
}

/*
health check
*/

export async function healthCheck() {
  const res = await fetch(`${API_BASE_URL}/health`, {
    method: "GET",
  });

  return res.json();
}
