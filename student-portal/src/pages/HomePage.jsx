import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import OrgCards from "@/components/home/OrgCards";
import EventCards from "@/components/home/EventCards";
import { useAuth } from "@/context/AuthContext";
const HomePage = () => {
  const { token, userData } = useAuth();


  return (
    <div className="pt-16 pb-16  ">
      <div className="">
        <div className=" flex justify-start items-center gap-3 p-5">
          <Avatar className="cursor-pointer size-14">
            <AvatarImage src="" alt="@shadcn" />
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

        <div className="mt-4">
          <div className="px-5 py-2 mb-2 space-y-4 ">
            <Input
              className="rounded-full border-none bg-slate-200 "
              placeholder="Search organizations..."
            />
            <div className="flex justify-between">
              <h1 className="font-semibold mb-2 "> Your Organizations</h1>
              <span className="text-muted-foreground">See all</span>
            </div>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 ml-5 pb-2">
            <OrgCards
              orgImage={null}
              title={"DEVmovers"}
              description={
                "DEVmovers is a dynamic organization of developers dedicated to fostering innovation and collaboration...."
              }
            />
            <OrgCards
              orgImage={null}
              title={"DEVmovers"}
              description={
                "DEVmovers is a dynamic organization of developers dedicated to fostering innovation and collaboration...."
              }
            />
            <OrgCards
              orgImage={null}
              title={"DEVmovers"}
              description={
                "DEVmovers is a dynamic organization of developers dedicated to fostering innovation and collaboration...."
              }
            />
            <OrgCards
              orgImage={null}
              title={"DEVmovers"}
              description={
                "DEVmovers is a dynamic organization of developers dedicated to fostering innovation and collaboration...."
              }
            />
          </div>

          <div className="px-5 mt-5">
            <div className="sticky top-[3.6rem] bg-white pb-2 flex justify-between">
              <h1 className="font-semibold ">Recent Events</h1>
              <span className="text-muted-foreground">See all</span>
            </div>
            <div className="space-y-2">
              <EventCards
                title={"DEVmovers Meet"}
                description={
                  "DEVmovers week long celebration dedicated on showcasing the talents, innovations, and achievements of the organization."
                }
                date={"Oct 10,2024 8:00am - 9:00am"}
                location={"DOrSU Main Campus"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
