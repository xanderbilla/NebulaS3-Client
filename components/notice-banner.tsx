"use client";

import { AlertCircle, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";

export function NoticeBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleAlert = () => {
    document.cookie = "noticeBanner=hide; path=/; SameSite=Strict";
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="h-8 w-full notice-banner mt-24 transition-all duration-300 ease-in-out">
      <Alert
        variant="info"
        className="transition-opacity duration-300 ease-in-out"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Work in Progress</AlertTitle>
        <AlertDescription>
          This project is currently under development. Some features may not be
          fully functional.
        </AlertDescription>
        <button
          type="button"
          className="absolute right-8 top-2 h-6 w-6 rounded-full opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={handleAlert}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
      </Alert>
    </div>
  );
}
