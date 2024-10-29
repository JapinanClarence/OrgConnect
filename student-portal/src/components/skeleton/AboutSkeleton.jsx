import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const AboutSkeleton = () => {
  return (
    <>
      <div className="rounded-lg px-5 py-4 shadow-sm border space-y-3">
        <Skeleton className={"h-5 w-[150px]"} />
        <div className="space-y-2">
          <Skeleton className={"h-3 w-full"} />
          <Skeleton className={"h-3 w-2/3"} />
          <Skeleton className={"h-3 w-5/6"} />
          <Skeleton className={"h-3 w-4/5"} />
          <Skeleton className={"h-3 w-3/5"} />
          <Skeleton className={"h-3 w-1/2"} />
        </div>
      </div>
      <div className="rounded-lg px-5 py-4 shadow-sm border space-y-3">
        <Skeleton className={"h-5 w-[100px]"} />
        <div className="space-y-2">
          <Skeleton className={"h-3 w-full"} />
          <Skeleton className={"h-3 w-2/3"} />
          <Skeleton className={"h-3 w-3/5"} />
        </div>
      </div>
    </>
  );
};

export default AboutSkeleton;
