import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
const EventSkeleton = ({ items }) => {
  return (
    <>
      {Array.from({ length: items }).map((_, itemIndex) => (
        <Card key={itemIndex}>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-lg">
              <Skeleton className="h-5 w-44" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="mt-4 space-y-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default EventSkeleton;
