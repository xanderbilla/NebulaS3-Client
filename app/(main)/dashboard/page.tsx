import { Suspense } from "react";
import DashboardSkeleton from "@/components/custom-ui/skeleton/DashboardSkeleton";
import DashboardContent from "@/components/custom-ui/dashboard/DashboardContent";

export default function DashboardPage() {
  return (
    <>
      <main className="container mx-auto p-6 min-h-[calc(100vh-9rem)]">
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </main>
    </>
  );
}
