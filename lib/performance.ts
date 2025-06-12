// Performance monitoring utilities
export class PerformanceMonitor {
  private static marks = new Map<string, number>();

  static mark(name: string): void {
    if (typeof window !== "undefined" && "performance" in window) {
      window.performance.mark(name);
      this.marks.set(name, Date.now());
    }
  }

  static measure(
    name: string,
    startMark: string,
    endMark?: string
  ): number | null {
    if (typeof window !== "undefined" && "performance" in window) {
      try {
        if (endMark) {
          window.performance.measure(name, startMark, endMark);
        } else {
          window.performance.measure(name, startMark);
        }

        const entries = window.performance.getEntriesByName(name, "measure");
        const lastEntry = entries[entries.length - 1];
        return lastEntry ? lastEntry.duration : null;
      } catch (error) {
        console.warn("Performance measurement failed:", error);
        return null;
      }
    }
    return null;
  }

  static logPageLoad(): void {
    if (typeof window !== "undefined" && "performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType(
            "navigation"
          )[0] as PerformanceNavigationTiming;
          if (navigation) {
            console.log("Page Load Performance:", {
              "DNS Lookup":
                navigation.domainLookupEnd - navigation.domainLookupStart,
              "TCP Connection": navigation.connectEnd - navigation.connectStart,
              Request: navigation.responseStart - navigation.requestStart,
              Response: navigation.responseEnd - navigation.responseStart,
              "DOM Processing":
                navigation.domContentLoadedEventStart - navigation.responseEnd,
              "Load Complete":
                navigation.loadEventEnd - navigation.loadEventStart,
              "Total Load Time":
                navigation.loadEventEnd - navigation.fetchStart,
            });
          }
        }, 0);
      });
    }
  }

  static clearMarks(): void {
    if (typeof window !== "undefined" && "performance" in window) {
      window.performance.clearMarks();
      window.performance.clearMeasures();
    }
    this.marks.clear();
  }
}
