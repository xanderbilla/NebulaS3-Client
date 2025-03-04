const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function getBuckets() {
  const res = await fetch(`${API_BASE_URL}/buckets/list`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Error fetching buckets: ${res.status}`);
  }
  return res.json();
}

export async function createBucket(bucketName: string) {
  const res = await fetch(
    `${API_BASE_URL}/buckets/create?bucket=${encodeURIComponent(bucketName)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  if (!res.ok) {
    throw new Error("Error creating bucket");
  }
  return res.json();
}
