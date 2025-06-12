import { Viewport } from "next";
import BackgroundShape from "@/components/custom-ui/home/BackgroundShape";
import Footer from "@/components/layout/Footer";
import DashboardNav from "@/components/layout/DashboardNav";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundShape variant="default" />
      <DashboardNav />
      <main className="container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
}
