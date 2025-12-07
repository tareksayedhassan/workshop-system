"use client";
import { Skeleton } from "@/src/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-4 p-3 w-full">
      <Skeleton className="h-[150px] w-full rounded-xl bg-gray-200 animate-pulse" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-full bg-gray-200 animate-pulse" />
        <Skeleton className="h-6 w-[80%] bg-gray-200 animate-pulse" />
        <Skeleton className="h-6 w-[80%] bg-gray-200 animate-pulse" />
        <Skeleton className="h-6 w-[80%] bg-gray-200 animate-pulse" />
        <Skeleton className="h-[150px] w-full rounded-xl bg-gray-200 animate-pulse" />

        <Skeleton className="h-6 w-[80%] bg-gray-200 animate-pulse" />
        <Skeleton className="h-6 w-[80%] bg-gray-200 animate-pulse" />
        <Skeleton className="h-6 w-[80%] bg-gray-200 animate-pulse" />
        <Skeleton className="h-[150px] w-full rounded-xl bg-gray-200 animate-pulse" />

        <Skeleton className="h-6 w-[80%] bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
