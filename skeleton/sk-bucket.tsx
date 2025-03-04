import React from "react";

type Props = object;

export default function BucketSkeleton({}: Props) {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative bg-white animate-pulse">
      <div className="absolute top-4 right-4">
        <div className="h-6 w-6 bg-gray-200 rounded-full" />
      </div>
      <div className="pr-8 space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 bg-gray-200 rounded" />
          <div className="h-5 w-16 bg-gray-200 rounded-full" />
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
        </div>
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
