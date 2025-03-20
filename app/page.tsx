import { Suspense } from "react";
import BackgroundShape from "@/components/custom-ui/home/BackgroundShape";
import HomeHero from "@/components/custom-ui/home/HomeHero";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

// Use a simple loading component instead of a full skeleton
function SimpleLoading() {
  return <div className="animate-pulse h-20 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>;
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black dark:text-white relative overflow-hidden">
      <BackgroundShape variant="default" />
      <div className="relative z-20">
        <Navbar />
      </div>
      <Suspense fallback={<SimpleLoading />}>
        <HomeHero />
      </Suspense>
      <Footer />
    </div>
  );
}
