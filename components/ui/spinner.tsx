"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps {
  readonly size?: "sm" | "md" | "lg" | "xl";
  readonly variant?: "default" | "primary" | "secondary" | "muted";
  readonly className?: string;
  readonly text?: string;
  readonly showText?: boolean;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

const variantClasses = {
  default: "text-foreground",
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  muted: "text-muted-foreground",
};

export function Spinner({
  size = "md",
  variant = "default",
  className,
  text,
  showText = false,
  ...props
}: SpinnerProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <svg
        className={cn(
          "animate-spin",
          sizeClasses[size],
          variantClasses[variant],
          showText && text && "mr-2"
        )}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {showText && text && (
        <span className={cn("text-sm font-medium", variantClasses[variant])}>
          {text}
        </span>
      )}
    </div>
  );
}

// Pre-configured spinner variants for common use cases
export function LoadingSpinner(props: Readonly<Omit<SpinnerProps, "variant">>) {
  return <Spinner variant="default" {...props} />;
}

export function PrimarySpinner(props: Readonly<Omit<SpinnerProps, "variant">>) {
  return <Spinner variant="primary" {...props} />;
}

export function ButtonSpinner(
  props: Readonly<Omit<SpinnerProps, "size" | "variant">>
) {
  return <Spinner size="sm" variant="default" {...props} />;
}

export function PageSpinner({
  text = "Loading...",
  ...props
}: Readonly<SpinnerProps>) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Spinner
        size="lg"
        variant="primary"
        showText
        text={text}
        className="flex-col gap-3"
        {...props}
      />
    </div>
  );
}

export function InlineSpinner(props: Readonly<Omit<SpinnerProps, "showText">>) {
  return <Spinner showText={false} {...props} />;
}

export default Spinner;
