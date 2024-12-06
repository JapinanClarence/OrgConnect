import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OrgCards = ({ orgImage, title, about, variant, onClick, id }) => {
  // console.log(about)
  const isHorizontal = variant === "horizontal";
  return (
    <Card
      className={`overflow-hidden ${
        isHorizontal
          ? "flex min-h-[150px]"
          : "min-w-[250px] max-w-[250px] scroll-ml-5 snap-center"
      }`}
      onClick={() => onClick(id)}
    >
      <CardHeader className="p-0 ">
        {orgImage ? (
          <div
            className={`${isHorizontal ? "h-full w-32" : "h-32"} bg-slate-200`}
          >
            <img
              src={orgImage}
              className={`h-full w-full object-cover`}
              alt="Org Image"
            />
          </div>
        ) : (
          <div
            className={`${isHorizontal ? "h-full w-32" : "h-32"} bg-slate-200`}
          ></div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">
          {" "}
          {title.length > 15 ? `${title.slice(0, 15)}...` : title}{" "}
        </CardTitle>
        <CardDescription className="text-pretty">
          {about
            ? about.length > 100
              ? `${about.slice(0, 100)}...`
              : about
            : ""}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default OrgCards;
