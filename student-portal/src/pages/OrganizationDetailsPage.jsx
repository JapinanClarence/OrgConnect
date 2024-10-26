import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import sample from "@/assets/sample.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleEllipsis, Ellipsis, Info } from "lucide-react";

const OrganizationDetailsPage = () => {
  return (
    <div className="">
      <div className="relative mt-10 h-[150px] overflow-hidden">
        <img src={sample} className="object-cover" alt="" />
        <div className=" absolute top-0 h-full w-full flex justify-center items-center opacity-80 bg-gradient-to-r from-gray-800 to-gray-900 ">
          <h1 className="font-medium text-2xl text-white font-accent">
            OrgName
          </h1>
        </div>
      </div>
      <div className="flex gap-2 px-5 py-3 border shadow-sm overflow-x-auto  scrollbar-hidden">
        <div className="rounded-full border px-3 py-1 bg-gray-300 shadow-sm text-sm">
          About
        </div>
        <div className="rounded-full border px-3 py-1 bg-gray-300 shadow-sm text-sm">
          Officers
        </div>
        <div className="rounded-full border px-3 py-1 bg-gray-300 shadow-sm text-sm">
          Events
        </div>
        <div className="rounded-full border px-3 py-1 bg-gray-300 shadow-sm text-sm">
          Announcement
        </div>
        <div className="rounded-full border px-3 py-1 bg-gray-300 shadow-sm text-sm">
          Payment
        </div>
      </div>
      <div className="px-5 py-5 space-y-2">
        <div className="rounded-lg px-5 py-4 shadow-sm border space-y-2">
          <h2 className="text-lg font-medium">About</h2>
          <p className="text-pretty text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa quis
            nobis ad. Ab exercitationem officiis nostrum sed quod error in
            praesentium debitis neque? Impedit, soluta incidunt sapiente iusto
            et porro! In tenetur enim quos accusamus corporis perspiciatis animi
            quia odit assumenda, aspernatur doloribus eos harum vero porro
            repellendus impedit ullam autem odio iure iusto! Qui culpa esse
            quaerat. Non, consequuntur?
          </p>
        </div>
        <div className="rounded-lg px-5 py-4 shadow-sm border space-y-2">
          <h2 className="text-lg font-medium">Contact</h2>
          <p className="text-pretty text-sm">facepalm.xom</p>
        </div>
      </div>
      {/* <div className="">
        <div className="px-5 py-1  text-center mb-2">
          <h2 className="text-xl underline underline-offset-4 font-accent font-medium">OFFICERS</h2>
        </div>
        <div className="space-y-2 px-5">
          <Card className="rounded-md">
            <div className="h-[200px] overflow-clip rounded-t-md">
              <img src={sample} alt="" />
            </div>
            <CardContent className="p-4 flex justify-between">
              <div>
                <CardTitle>JuanT</CardTitle>
                <CardDescription>President</CardDescription>
              </div>

              <div className=" flex items-center">
                <button>
                  <Info className=" text-muted-foreground" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div> */}
    </div>
  );
};

export default OrganizationDetailsPage;
