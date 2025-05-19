import dynamic from "next/dynamic";
import BackgroundShape from "@/components/custom-ui/home/BackgroundShape";
import HomeHero from "@/components/custom-ui/home/HomeHero";

const Footer = dynamic(() => import("@/components/layout/Footer"));
const Navbar = dynamic(() => import("@/components/layout/Navbar"));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black dark:text-white relative overflow-hidden">
      <BackgroundShape variant="default" />
      <div className="relative z-20">
        <Navbar />
      </div>
      {/* <NoticeBanner /> */}
      <HomeHero />
      <Footer />
    </div>
  );
}
