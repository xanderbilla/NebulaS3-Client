"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn("text-sm font-medium leading-none glass-text", className)}
    {...props}
  />
);

// Simple loading spinner instead of importing component
const LoadingSpinner = () => (
  <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Minimalist redirecting component
const Redirecting = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <LoadingSpinner />
    <p className="text-xl font-medium">Redirecting...</p>
  </div>
);

// Loading state for form fields
const InputSkeleton = () => (
  <div className="w-full h-9 animate-pulse bg-accent rounded-md" />
);

const LabelSkeleton = () => (
  <div className="w-16 h-4 animate-pulse bg-accent rounded-md" />
);

const ButtonSkeleton = () => (
  <div className="w-full h-9 animate-pulse bg-accent rounded-md" />
);

export default function LoginForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"form">>) {
  const [credentials, setCredentials] = useState({
    accessKey: "",
    secretKey: "",
    region: "ap-south-1",
  });
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isClientLoading, setIsClientLoading] = useState(true);
  const router = useRouter();

  // Simulate initial loading state using useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClientLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Hardcoded login - simulate successful authentication
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      // Set hardcoded session tokens
      document.cookie = `sessionToken=hardcoded-session-token; path=/; Secure; SameSite=Strict`;
      document.cookie = `accessKey=${credentials.accessKey}; path=/; Secure; SameSite=Strict`;

      toast.success("Login successful!");
      setIsRedirecting(true);
      router.push("/dashboard");
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

  // Show skeleton while client-side loading
  if (isClientLoading) {
    return (
      <div className="flex flex-col gap-4 p-5 max-w-md mx-auto">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="h-8 w-40 animate-pulse bg-accent rounded-md" />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <LabelSkeleton />
            <InputSkeleton />
          </div>
          <div className="grid gap-1">
            <LabelSkeleton />
            <InputSkeleton />
          </div>
          <ButtonSkeleton />
        </div>
      </div>
    );
  }

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
            disabled={loading}
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
            disabled={loading}
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
          disabled={loading || !credentials.accessKey || !credentials.secretKey}
        >
          {loading ? (
            <>
              <LoadingSpinner />
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
