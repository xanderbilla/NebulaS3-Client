import { GalleryVerticalEnd } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { LoginInfo } from "./components/login-info";

const LoginForm = dynamic(() => import("./components/login-form"), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-40" />
  ),
});

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 dark:bg-background">
        <div className="flex gap-2 justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            NebulaS3
          </Link>
        </div>
        <LoginInfo />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted dark:bg-muted/50 lg:block">
        <Image
          src="/placeholder/placeholder.svg"
          alt="Image"
          layout="fill"
          className="absolute z-10 inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
