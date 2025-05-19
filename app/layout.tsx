import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "NebulaS3",
  description: "NebulaS3 is a simple and easy-to-use S3-compatible object storage service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="no-scrollbar">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className={`flex flex-col min-h-screen dark:bg-black dark:text-white relative overflow-hidden`}>
              {children}
            </div>
            <Toaster duration={3000} richColors/>
          </ThemeProvider>
        </body>
      </html>
  );
}
