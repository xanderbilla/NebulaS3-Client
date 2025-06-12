"use client";

import { ArrowLeft } from "lucide-react";
import BackButton from "@/components/ui/custom-button";
import LoginForm from "@/components/custom-ui/auth/login-form";

export default function LoginPageClient() {
  return (
    <>
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
    </>
  );
}
