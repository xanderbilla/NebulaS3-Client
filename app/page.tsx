import { Metadata } from "next";
import BackgroundShape from "@/components/custom-ui/home/BackgroundShape";
import HomeHero from "@/components/custom-ui/home/HomeHero";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Nebula S3 | Modern S3 Storage Management",
  description: "NebulaS3 is a modern application that transforms how users interact with Amazon S3, offering a sophisticated web interface with enhanced capabilities.",
  keywords: [
    "S3",
    "Amazon S3",
    "Cloud Storage",
    "Storage Management", 
    "Web Interface",
    "Bucket Management",
    "Object Storage",
    "AWS",
  ],
  authors: [{ name: "Nebula S3 Team" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nebula-s3.com",
    title: "NEBULA S3 | Modern S3 Storage Management",
    description: "NebulaS3 is a modern application that transforms how users interact with Amazon S3, offering a sophisticated web interface with enhanced capabilities.",
    siteName: "NEBULA S3",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEBULA S3 | Modern S3 Storage Management", 
    description: "NebulaS3 is a modern application that transforms how users interact with Amazon S3, offering a sophisticated web interface with enhanced capabilities.",
    creator: "@nebulas3",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black dark:text-white relative overflow-hidden">
      <BackgroundShape variant="default" />
      <div className="relative z-20">
        <Navbar />
      </div>
      <HomeHero />
      <Footer />
    </div>
  );
}
