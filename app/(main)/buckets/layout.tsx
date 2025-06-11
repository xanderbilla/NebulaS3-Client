import { Viewport } from "next";
import BackgroundShape from "@/components/custom-ui/home/BackgroundShape";
import DashboardNav from "@/components/layout/DashboardNav";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function BucketsLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundShape variant="default" />
      <DashboardNav />
      <main className="container mx-auto px-4 py-6 relative z-5">
        {children}
      </main>
    </div>
  );
}
