"use client";

import dynamic from "next/dynamic";
import BucketSkeleton from "@/components/custom-ui/skeleton/BucketSkeleton";

// Lazy load heavy components with optimized loading
const BucketManagement = dynamic(() => import("./bucket-management"), {
  loading: () => <BucketSkeleton count={6} />,
  ssr: false,
});

export default BucketManagement;
