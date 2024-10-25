import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OrgCardSkeleton = ({ items,  variant }) => {
  const isHorizontal = variant === "horizontal";
  return (
    <>
      {Array.from({ length: items }).map((_, itemIndex) => (
        <Card key={itemIndex} className={`overflow-hidden ${isHorizontal ? 'flex' : 'min-w-[250px] max-w-[250px]  scroll-ml-5 snap-center' }`}>
          <CardHeader className="p-0 ">
            <div className={`h-32 ${isHorizontal ? 'h-full w-32' : 'h-32'} bg-slate-200 flex justify-center items-center`}>
              <LoaderCircle className="animate-spin text-gray-400" size={24} />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg mb-3">
              <Skeleton className="h-5 max-w-44" /> {/* Use Skeleton directly */}
            </CardTitle>
            <div className="space-y-1">
              <Skeleton className="h-5 max-w-24" />
              <Skeleton className="h-5 max-w-full" />
              <Skeleton className="h-5 max-w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
export default OrgCardSkeleton;
