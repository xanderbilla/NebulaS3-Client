import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import ThemeToggle from "@/components/theme-toggle";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata:Metadata = {
  title: "NebulaS3 - Advanced AWS S3 Management for Secure Cloud Storage",
  description:
    "NebulaS3 is a powerful SaaS platform that simplifies AWS S3 bucket management with secure authentication, bucket operations, and cloud storage solutions.",
  keywords: [
    "NebulaS3",
    "AWS S3 Management",
    "Cloud Storage Solutions",
    "S3 Bucket Operations",
    "AWS STS Authentication",
    "Secure Cloud Storage",
    "S3 SaaS Platform",
    "Manage AWS S3",
  ],
  openGraph: {
    title: "NebulaS3 - Advanced AWS S3 Management for Secure Cloud Storage",
    description:
      "Manage your AWS S3 buckets with ease using NebulaS3. Secure authentication, bucket creation, and cloud storage solutions tailored for efficiency.",
    url: "https://yourdomain.com",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/home-og.jpg",
        width: 1200,
        height: 630,
        alt: "NebulaS3 - AWS S3 Management Platform",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ThemeToggle />
        {children}
        <Toaster duration={3000} richColors/>
      </body>
    </html>
  );
}
