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
import { useAuth } from "@/hooks/useAuth";

interface LoginCredentials {
  accessKey: string;
  secretKey: string;
  region: string;
}

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  className?: string;
}

export default function LoginForm({ className, ...props }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    accessKey: "",
    secretKey: "",
    region: "ap-south-1",
  });
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleInputChange =
    (field: keyof LoginCredentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(credentials);
      if (success) {
        setIsRedirecting(true);
        setTimeout(() => {
          router.push("/dashboard/buckets");
        }, 200);
      }
    } catch (error) {
      console.error("Login error:", error);
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
            onChange={handleInputChange("accessKey")}
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
            onChange={handleInputChange("secretKey")}
          />
        </div>
        <Button
          type="submit"
          variant="default"
          className="w-full"
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
