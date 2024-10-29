import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
const OfficerCardSkeleton = ({ items }) => {
  return Array.from({ length: items }).map((_, itemIndex) => (
    <Card key={itemIndex} className="w-[320px] shadow-md ">
      <Skeleton className=" h-[200px] w-full  rounded-t-lg rounded-b-none" />
      <CardContent className="p-5 flex justify-between ">
        <div className="space-y-2">
          <Skeleton className={"h-7 w-[150px]"} />
          <Skeleton className={"h-5 w-32"} />
        </div>

        <div className="inline-flex justify-center items-center">
          <Skeleton className={"size-10"} />
        </div>
      </CardContent>
    </Card>
  ));
};

export default OfficerCardSkeleton;
