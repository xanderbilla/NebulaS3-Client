"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SpinnerIcon from "@/icons/spinner-icon";
import Redirecting from "@/skeleton/redirecting";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [credentials, setCredentials] = useState({
    accessKey: "",
    secretKey: "",
    region: "ap-south-1",
  });
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        setIsRedirecting(true);
        setTimeout(() => {
          router.push("/dashboard/buckets");
        }, 200);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to validate credentials");
    } finally {
      setLoading(false);
    }
  };

  if (isRedirecting) {
    return <Redirecting />;
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-semibold dark:text-white">
          AWS Credentials
        </h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="accessKey" className="text-sm dark:text-gray-200">
            AWS Access Key
          </Label>
          <Input
            id="accessKey"
            type="text"
            placeholder="Enter your AWS access key"
            required
            disabled={loading}
            maxLength={264}
            value={credentials.accessKey}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700 h-12"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                accessKey: e.target.value,
              }))
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="secretKey" className="text-sm dark:text-gray-200">
            AWS Secret Key
          </Label>
          <Input
            id="secretKey"
            type="password"
            placeholder="Enter your AWS secret key"
            required
            maxLength={264}
            disabled={loading}
            value={credentials.secretKey}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700 h-12"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                secretKey: e.target.value,
              }))
            }
          />
        </div>
        <Button
          type="submit"
          variant="secondary"
          className="w-full dark:hover:bg-secondary/90 h-12"
          disabled={loading || !credentials.accessKey || !credentials.secretKey}
        >
          {loading ? (
            <>
              <SpinnerIcon />
              Connecting...
            </>
          ) : (
            "Connect"
          )}
        </Button>
      </div>
    </form>
  );
}
