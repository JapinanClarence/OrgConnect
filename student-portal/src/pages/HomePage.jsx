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
    <div className="pt-16 pb-16  ">
      <div className="">
        <div className=" flex justify-start items-center gap-3 p-5">
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

        <div className="mt-5 ">
          <div className="px-5">
            <Input
              className="rounded-full border-none bg-slate-200 "
              placeholder="Search organizations..."
            />
          </div>
          <div className="mt-4">
            <div className="">
              <div className="flex justify-between px-5">
                <h1 className="font-semibold mb-2 "> Your Organizations</h1>
                <span className="text-muted-foreground">See all</span>
              </div>

              <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 ml-5 pb-2">
                <Card className="overflow-hidden min-w-[250px]  scroll-ml-5 snap-center">
                  <CardHeader className="p-0 ">
                    <img
                      src="sample.jpg"
                      className="h-32 object-cover"
                      alt=""
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">DEVmovers </CardTitle>
                    <CardDescription>
                      DEVmovers is a dynamic organization of developers
                      dedicated to fostering innovation and collaboration....
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden min-w-[250px]  scroll-ml-5 snap-center">
                  <CardHeader className="p-0 ">
                    <img
                      src="sample.jpg"
                      className="h-32 object-cover"
                      alt=""
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">DEVmovers </CardTitle>
                    <CardDescription>
                      DEVmovers is a dynamic organization of developers
                      dedicated to fostering innovation and collaboration....
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden min-w-[250px]  scroll-ml-5 snap-center">
                  <CardHeader className="p-0 ">
                    <img
                      src="sample.jpg"
                      className="h-32 object-cover"
                      alt=""
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">DEVmovers </CardTitle>
                    <CardDescription>
                      DEVmovers is a dynamic organization of developers
                      dedicated to fostering innovation and collaboration....
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden min-w-[250px]  scroll-ml-5 snap-center">
                  <CardHeader className="p-0 ">
                    <img
                      src="sample.jpg"
                      className="h-32 object-cover"
                      alt=""
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">DEVmovers </CardTitle>
                    <CardDescription>
                      DEVmovers is a dynamic organization of developers
                      dedicated to fostering innovation and collaboration....
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
              <div className="px-5 mt-5">
                <div className="sticky top-14 bg-white z-10 pb-2 flex justify-between">
                  <h1 className="font-semibold ">Recent Events</h1>
                  <span className="text-muted-foreground">See all</span>
                </div>

                <div className="space-y-2">
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">DEVmovers Meet</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <CardDescription>
                        DEVmovers week long celebration dedicated on showcasing
                        the talents, innovations, and achievements of the
                        organization.
                      </CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">DEVmovers Meet</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <CardDescription>
                        DEVmovers week long celebration dedicated on showcasing
                        the talents, innovations, and achievements of the
                        organization.
                      </CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">DEVmovers Meet</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <CardDescription>
                        DEVmovers week long celebration dedicated on showcasing
                        the talents, innovations, and achievements of the
                        organization.
                      </CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">DEVmovers Meet</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <CardDescription>
                        DEVmovers week long celebration dedicated on showcasing
                        the talents, innovations, and achievements of the
                        organization.
                      </CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">DEVmovers Meet</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <CardDescription>
                        DEVmovers week long celebration dedicated on showcasing
                        the talents, innovations, and achievements of the
                        organization.
                      </CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">DEVmovers Meet</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <CardDescription>
                        DEVmovers week long celebration dedicated on showcasing
                        the talents, innovations, and achievements of the
                        organization.
                      </CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">DEVmovers Meet</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <CardDescription>
                        DEVmovers week long celebration dedicated on showcasing
                        the talents, innovations, and achievements of the
                        organization.
                      </CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">DEVmovers Meet</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <CardDescription>
                        DEVmovers week long celebration dedicated on showcasing
                        the talents, innovations, and achievements of the
                        organization.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
