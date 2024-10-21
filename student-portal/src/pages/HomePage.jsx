import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="h-full  pt-16 bg-slate-50">
      <div className=" px-5 ">
        <div className=" flex justify-start items-center gap-3">
          <Avatar className="cursor-pointer size-14">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="text-gray-500 font-bold bg-gray-200">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="">
            <h1 className="font-bold text-2xl text-zinc-800">
              {" "}
              Hi, Jane Doe!{" "}
            </h1>
            <p className="text-sm text-muted-foreground">janeDoe@gmail.com</p>
          </div>
        </div>
        <div className="mt-10">
          <Input
            className="rounded-full border-none bg-slate-200 "
            placeholder="Search organizations..."
          />
          <div className="mt-4">
            <h1 className="font-semibold mb-2"> Your Organizations</h1>
            <div className="grid gap-2">
              <Card className="overflow-hidden">
                <CardHeader className="p-0 ">
                  <img src="sample.jpg" className="h-40 object-cover" alt="" />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg">DEVmovers</CardTitle>
                  <CardDescription>
                    DEVmovers is a dynamic organization of developers dedicated
                    to fostering innovation and collaboration. It serves as a
                    hub for coding enthusiasts, software engineers, and tech
                    professionals to share knowledge, work on projects, and
                    advance their skills....
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="p-0 ">
                  <img src="sample.jpg" className="h-40 object-cover" alt="" />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg">DEVmovers</CardTitle>
                  <CardDescription>
                    DEVmovers is a dynamic organization of developers dedicated
                    to fostering innovation and collaboration. It serves as a
                    hub for coding enthusiasts, software engineers, and tech
                    professionals to share knowledge, work on projects, and
                    advance their skills....
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="p-0 ">
                  <img src="sample.jpg" className="h-40 object-cover" alt="" />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg">DEVmovers</CardTitle>
                  <CardDescription>
                    DEVmovers is a dynamic organization of developers dedicated
                    to fostering innovation and collaboration. It serves as a
                    hub for coding enthusiasts, software engineers, and tech
                    professionals to share knowledge, work on projects, and
                    advance their skills....
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="p-0 ">
                  <img src="sample.jpg" className="h-40 object-cover" alt="" />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg">DEVmovers</CardTitle>
                  <CardDescription>
                    DEVmovers is a dynamic organization of developers dedicated
                    to fostering innovation and collaboration. It serves as a
                    hub for coding enthusiasts, software engineers, and tech
                    professionals to share knowledge, work on projects, and
                    advance their skills....
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
