"use client";

import React from "react";

interface ErrorBoundaryProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

function DefaultErrorFallback({
  error,
  retry,
}: {
  error: Error;
  retry: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-4">
        <div className="text-red-500 text-6xl">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {error.message ||
            "An unexpected error occurred while loading the page."}
        </p>
        <button
          onClick={retry}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} retry={this.retry} />;
    }

    return this.props.children;
  }
}
