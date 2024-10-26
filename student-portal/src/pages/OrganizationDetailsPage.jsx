import React, { useState } from "react";
import sample from "@/assets/sample.jpg";
import { ChevronLeft, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OrganizationDrawer from "@/components/organization/OrganizationDrawer";

const OrganizationDetailsPage = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div className="">
      <header className="fixed top-0 left-0 w-full h-10 z-10 ">
        <div className="px-3 py-2 bg-slate-50 shadow-sm border-b  flex items-center justify-between">
          <button className="" onClick={handleClick}>
            <ChevronLeft size={25} />
          </button>

          <Button
            variant="icon"
            className="h-5 item-center border-zinc-300 text-md flex-shrink"
            onClick={() => setOpenDrawer(true)}
          >
            <Ellipsis />
          </Button>
        </div>
      </header>
      <div
        className="relative mt-10 h-[150px] overflow-hidden bg-cover bg-center border-b-yellow-500 border-b-4"
        style={{ backgroundImage: `url(${sample})` }}
      >
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 absolute h-full w-full opacity-80"></div>
        <div className=" absolute top-0 h-full w-full flex justify-center items-center ">
          <h1 className="font-medium text-2xl text-white font-accent">
            OrgName
          </h1>
        </div>
      </div>
      <OrganizationDrawer open={openDrawer} onOpenChange={setOpenDrawer} />
      {/* <div className="flex gap-2 px-5 py-2 border shadow-sm justify-end">
        <Button variant="secondary" className="text-md w-full">
          Leave
          <ChevronDown size={15} strokeWidth={3} className="ml-2" />
        </Button>
        <div className="bg-slate-300 w-full rounded-lg content-center px-3 font-semibold">OrgName</div>
        <Button
          variant="outline"
          className="border-zinc-300 text-md flex-shrink"
        >
          <Ellipsis />
        </Button>
        <Drawer>
          <DrawerTrigger>Joined</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>
                 Leave
              </Button>
              <DrawerClose>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div> */}
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
