"use client";

import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import BackButton from "@/components/ui/custom-button";
import Logo from "@/components/Logo";

// Load components with aggressive code splitting and skeleton fallbacks
const LoginForm = dynamic(
  () => import("@/components/custom-ui/auth/login-form"),
  {
    loading: () => <LoginSkeleton />,
    ssr: false,
  }
);

const LoginSkeleton = dynamic(
  () => import("@/components/custom-ui/skeleton/LoginSkeleton"),
  {
    ssr: false,
  }
);

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-center">
          <Logo />
        </div>
        <div className="flex justify-start mt-4">
          <BackButton
            title="Back"
            variant="link"
            onClick={() => window.history.back()}
            icon={<ArrowLeft className="size-4" />}
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted dark:bg-muted/50 lg:block">
        {/* Replaced Image with CSS background for optimization */}
        <div
          className="absolute z-10 inset-0 h-full w-full bg-[url('/placeholder.svg')] bg-cover bg-center dark:brightness-[0.2] dark:grayscale"
          role="img"
          aria-label="Login background"
        />
      </div>
    </div>
  );
}
