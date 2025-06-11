"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAuth";
import type { LoginCredentials } from "@/types/auth";
import { ButtonSpinner } from "@/components/ui/spinner";

// Simple toast implementation
const toast = {
  success: (message: string) => {
    console.log("✅ Success:", message);
  },
  error: (message: string) => {
    console.error("❌ Error:", message);
  },
};

// Inline minimal components to reduce imports
const Button = ({
  children,
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
}) => (
  <button
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-50",
      "glass-button",
      className
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "flex h-9 w-full rounded-md border border-input px-3 py-1",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      "glass-card glass-text",
      className
    )}
    {...props}
  />
);

const Label = ({
  className,
  htmlFor,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  if (!htmlFor) {
    console.warn("Label component is missing htmlFor attribute");
  }
  return (
    <label
      className={cn("text-sm font-medium leading-none glass-text", className)}
      htmlFor={htmlFor}
      {...props}
    />
  );
};

export default function LoginForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"form">>) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    accessKey: "",
    secretKey: "",
    region: "ap-south-1",
  });
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    login(credentials, {
      onSuccess: () => {
        toast.success("Login successful");
        router.push("/dashboard");
      },
      onError: (error) => {
        toast.error(error?.message ?? "Failed to validate credentials");
      },
    });
  };

  return (
    <form
      className={cn("flex flex-col gap-4 p-5 max-w-md mx-auto", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold gradient-text">
          AWS Credentials
        </h1>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="accessKey" className="text-sm glass-text">
            AWS Access Key
          </Label>
          <Input
            id="accessKey"
            type="text"
            placeholder="Enter your AWS access key"
            required
            disabled={isPending}
            maxLength={264}
            value={credentials.accessKey}
            className="glass-card glass-text h-9"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                accessKey: e.target.value,
              }))
            }
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="secretKey" className="text-sm glass-text">
            AWS Secret Key
          </Label>
          <Input
            id="secretKey"
            type="password"
            placeholder="Enter your AWS secret key"
            required
            maxLength={264}
            disabled={isPending}
            value={credentials.secretKey}
            className="glass-card glass-text h-9"
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
          variant="default"
          className="w-full h-9 glass-button mt-2"
          disabled={
            isPending || !credentials.accessKey || !credentials.secretKey
          }
        >
          {isPending ? (
            <>
              <ButtonSpinner />
              <span className="ml-2">Connecting...</span>
            </>
          ) : (
            "Login to S3"
          )}
        </Button>
      </div>
    </form>
  );
}
