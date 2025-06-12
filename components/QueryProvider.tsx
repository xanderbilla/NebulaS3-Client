"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface QueryProviderProps {
  readonly children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute (reduced from 5 minutes)
            gcTime: 5 * 60 * 1000, // 5 minutes (reduced from 10 minutes)
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors
              if (error && typeof error === "object" && "status" in error) {
                const status = error.status as number;
                if (status >= 400 && status < 500) return false;
              }
              return failureCount < 2; // Reduced from 3
            },
            refetchOnWindowFocus: false,
            refetchOnReconnect: true, // Changed from 'always'
            refetchOnMount: true, // Explicitly set
            networkMode: "online", // Only run queries when online
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
