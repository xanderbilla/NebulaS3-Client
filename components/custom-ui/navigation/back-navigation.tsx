"use client";

import { useRouter } from "next/navigation";
import CustomButton from "@/components/ui/custom-button";
import { ArrowLeft } from "lucide-react";

export default function BackNavigation() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <CustomButton
      title="Previous Page"
      variant="link"
      onClick={handleBack}
      icon={<ArrowLeft className="size-4" />}
    />
  );
}
