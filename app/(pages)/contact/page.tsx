import { Metadata } from "next";
import Link from "next/link";
import BackNavigation from "@/components/custom-ui/navigation/back-navigation";

export const metadata: Metadata = {
  title: "Contact | Nebula S3",
  description: "Get in touch with the Nebula S3 team. We're here to help with your cloud storage needs.",
  keywords: [
    "Contact",
    "Support", 
    "Help",
    "Nebula S3",
    "Customer Service",
    "Get in Touch",
  ],
  authors: [{ name: "Nebula S3 Team" }],
  robots: "index, follow",
};

export default function ContactPage() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-[calc(100vh-6rem)] p-8 pb-20 gap-8 pt-20 sm:p-20">
      <div className="max-w-7xl mx-auto w-full">
        <BackNavigation />
      </div>

      <main className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Contact Us
        </h1>

        <div className="space-y-6">
          <p className="text-lg">
            Have questions or need support? We&apos;re here to help. Reach out
            to us through any of these channels:
          </p>

          <div className="space-y-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Email Support</h2>
              <Link href="mailto:vikas99blr@gmail.com">
                mail.vikas99blr@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
