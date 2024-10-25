import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

const OrgCards = ({ orgImage, title, about, variant }) => {
  const isHorizontal = variant === "horizontal";
  return (
    <Card className={`overflow-hidden ${isHorizontal ? 'flex' : 'min-w-[250px] w-[250px]  scroll-ml-5 snap-center' }`}>
      <CardHeader className="p-0 ">
        {orgImage ? (
          <img src="sample.jpg" className={`${isHorizontal ? 'h-full w-32' : 'h-32'} object-cover`}alt="" />
        ) : (
          <div className={`${isHorizontal ? 'h-full w-32' : 'h-32'} bg-slate-200`}></div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{title} </CardTitle>
        <CardDescription className="text-pretty">
         {about.length > 100 ? `${about.slice(0, 100)}...` : about.length}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default OrgCards;
