import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const StatusCardSkeleton = () => {
  return (
    <div className="mt-2 mb-4 mx-5 p-3 rounded-lg bg-white shadow-sm border flex justify-between">
      <div>
        <Skeleton className={"h-5 w-32 mb-2"} />
        <Skeleton className={"h-4 w-44"} />
      </div>
        <Skeleton className={"size-10"}/>
    </div>
  );
};

export default StatusCardSkeleton;
