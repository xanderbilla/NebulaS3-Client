import LoadingSpinner from "@/components/icons/LoadingSpinner";
import React from "react";

export default function Redirecting() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LoadingSpinner />
      <p className="text-xl font-medium dark:text-white">
        Redirecting to dashboard...
      </p>
    </div>
  );
}