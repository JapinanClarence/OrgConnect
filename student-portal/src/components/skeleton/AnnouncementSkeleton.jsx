import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const AnnouncementSkeleton = ({ items }) => {
  return (
    <>
      {Array.from({ length: items }).map((_, itemIndex) => (
        <div key={itemIndex} className="shadow-sm bg-white border-[1px] rounded-lg border-zinc-300 p-5 flex flex-col gap-2">
          <div>
            <Skeleton className={"max-w-[190px] h-3"}></Skeleton>
          </div>
          <div>
            <Skeleton className={"max-w-[300px] h-3"}></Skeleton>
          </div>
          <div>
            <Skeleton className={"max-w-[500px] h-3"}></Skeleton>
          </div>
          <div>
            <Skeleton className={"max-w-[250px] h-3"}></Skeleton>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnnouncementSkeleton;
