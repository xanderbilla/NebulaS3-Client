import SpinnerIcon from "@/icons/spinner-icon";
import React from "react";

type Props = {};

export default function redirecting({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <SpinnerIcon className="h-8 w-8" />
      <p className="text-xl font-medium dark:text-white">
        Redirecting to dashboard...
      </p>
    </div>
  );
}
