import { Metadata } from "next";
import Link from "next/link";
import LoginPageClient from "@/components/custom-ui/auth/login-page-client";

export const metadata: Metadata = {
  title: "Login | Nebula S3",
  description: "Sign in to your Nebula S3 account to manage your AWS S3 buckets with advanced security and features.",
  keywords: [
    "Login",
    "Sign In",
    "Authentication",
    "Nebula S3",
    "AWS S3 Login",
    "Secure Access",
  ],
  authors: [{ name: "Nebula S3 Team" }],
  robots: "index, follow",
};

// Optimize logo component to reduce imports
const Logo = () => (
  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 14h18" />
      <path d="M3 9h18" />
      <path d="M9 19V9" />
      <path d="M15 19V9" />
    </svg>
  </div>
);

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium glass-text"
          >
            <Logo />
            NebulaS3
          </Link>
        </div>
        <LoginPageClient />
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
