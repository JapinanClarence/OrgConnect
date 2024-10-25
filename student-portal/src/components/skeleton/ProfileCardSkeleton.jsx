import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileCardSkeleton = () => {
  return (
    <div className="shadow-sm rounded-lg border bg-white space-y-4 p-4 font-normal text-sm text-gray-900 ">
      <div className="flex gap-2">
        <Skeleton className={"flex-shrink h-4 bg-gray-300 w-36"} />

        <Skeleton className={"h-4 bg-gray-300 w-full"}/>
      </div>
      <div className="flex gap-2">
        <Skeleton className={"flex-shrink h-4 bg-gray-300 w-36"} />

        <Skeleton className={"h-4 bg-gray-300 w-full"}/>
      </div>
      <div className="flex gap-2">
        <Skeleton className={"flex-shrink h-4 bg-gray-300 w-36"} />

        <Skeleton className={"h-4 bg-gray-300 w-full"}/>
      </div>
      <div className="flex gap-2">
        <Skeleton className={"flex-shrink h-4 bg-gray-300 w-36"} />

        <Skeleton className={"h-4 bg-gray-300 w-full"}/>
      </div>
      <div className="flex gap-2">
        <Skeleton className={"flex-shrink h-4 bg-gray-300 w-36"} />

        <Skeleton className={"h-4 bg-gray-300 w-full"}/>
      </div>
      <div className="flex gap-2">
        <Skeleton className={"flex-shrink h-4 bg-gray-300 w-36"} />

        <Skeleton className={"h-4 bg-gray-300 w-full"}/>
      </div>
      <div className="flex gap-2">
        <Skeleton className={"flex-shrink h-4 bg-gray-300 w-36"} />

        <Skeleton className={"h-4 bg-gray-300 w-full"}/>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
