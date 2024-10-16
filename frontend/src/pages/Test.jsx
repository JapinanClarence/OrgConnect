import {
  Home,
  Calendar,
  Newspaper,
  User,
  Users,
  SquareTerminal,
  MoreVertical,
  MenuIcon,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { DialogTitle } from "@/components/ui/dialog";

export function Test() {

  return (
    <div className="h-screen w-full">
      <aside className="fixed left-0 z-20 h-full bg-zinc-900 flex-col border-r hidden md:flex lg:w-64 text-white">
        <div className="border-b border-zinc-500 flex justify-start items-center py-2 px-4">
          <Link to={"/"} aria-label="Home">
            <img
              src="OrgConnect-transparent.svg"
              className="size-9 fill-foreground"
            />
          </Link>
          <span className="ml-2 hidden text-xl font-semibold lg:block">
            OrgConnect
          </span>
        </div>
        <nav className="grid gap-1 pt-2 px-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/" className="rounded-lg hover:bg-zinc-800 size-full flex items-center justify-start p-2">
                  <Home  />
                  <span className="hidden lg:block ml-2 font-bold text-sm">
                    Home
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="lg:hidden" side="right" sideOffset={5}>
                Home
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/event" className="rounded-lg hover:bg-zinc-800 size-full flex items-center justify-start p-2">
                  <Calendar className="" />
                  <span className="hidden lg:block ml-2 font-bold text-sm">
                    Event
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="lg:hidden" side="right" sideOffset={5}>
                Event
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={"/announcement"} className="rounded-lg hover:bg-zinc-800 size-full flex items-center justify-start p-2">
                  <Newspaper className="" />
                  <span className="hidden lg:block ml-2 font-bold text-sm">
                    Announcement
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="lg:hidden" side="right" sideOffset={5}>
                Announcement
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/payments" className="rounded-lg hover:bg-zinc-800 size-full flex items-center justify-start p-2">
                  <WalletCards className="" />
                  <span className="hidden lg:block ml-2 font-bold text-sm">
                    Payments
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="lg:hidden" side="right" sideOffset={5}>
                Payments
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={"/officer"} className="rounded-lg hover:bg-zinc-800 size-full flex items-center justify-start p-2">
                  <SquareTerminal className="" />
                  <span className="hidden lg:block ml-2 font-bold text-sm">
                    Analytics
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="lg:hidden" side="right" sideOffset={5}>
                Analytics
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={"/officer"} className="rounded-lg hover:bg-zinc-800 size-full flex items-center justify-start p-2">
                  <User className="" />
                  <span className="hidden lg:block ml-2 font-bold text-sm">
                    Officers
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="lg:hidden" side="right" sideOffset={5}>
                Officers
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={"/officer"} className="rounded-lg hover:bg-zinc-800 size-full flex items-center justify-start p-2">
                  <Users className="" />
                  <span className="hidden lg:block ml-2 font-bold text-sm">
                    Members
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="lg:hidden" side="right" sideOffset={5}>
                Members
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2 border-t-[1px] border-zinc-500">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  {/* Avatar remains visible on all screen sizes */}
                  <Avatar className="size-10">
                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="user-profile" /> */}
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>

                  {/* Hide name on medium screens and above */}
                  <div className="hidden lg:inline lg:ml-1 text-sm font-bold">
                    John Doe{" "}
                    <span className="font-normal">johnDoe@gmail.com</span>
                  </div>

                  {/* Hide dropdown menu on medium screens and above */}
                  <DropdownMenu className="">
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="hidden lg:inline w-min mr-0 ml-auto p-0 bg-inherit hover:bg-transparent"
                        size="icon"
                      >
                        <MoreVertical className="text-zinc-900" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TooltipTrigger>
              <TooltipContent className="lg:hidden" side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div
        className={`flex flex-col flex-1 transition-all duration-300 md:ml-[72px] lg:ml-64`}
      >
        <header className="sticky top-0 z-10 flex h-[53px] items-center border-b bg-zinc-200 px-4 shadow-md">
          <Sheet className="">
            <SheetTrigger asChild>
              <Button
                className="md:hidden p-2 text-xl hover:bg-zinc-300"
                variant="ghost"
                aria-label="Toggle sidebar"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-zinc-900 text-white border-zinc-500"
              aria-describedby={undefined}
            >
                <DialogTitle></DialogTitle>
              <div className="flex items-center pb-2 border-b-[1px] border-zinc-300">
                <Link to={"/"} aria-label="Home">
                  <img
                    src="OrgConnect-transparent.svg"
                    className="size-12 fill-foreground"
                  />
                </Link>
                <span className=" inline text-2xl font-semibold">
                  OrgConnect
                </span>
              </div>

              <div className="grid gap-1 mt-5 font-normal text-lg">
                <Link to={"/"} className="rounded-lg hover:bg-zinc-800 p-2">Home</Link>

                <Link className="rounded-lg hover:bg-zinc-800 p-2">Calendar</Link>

                <Link className="rounded-lg hover:bg-zinc-800 p-2">Announcement</Link>

                <Link className="rounded-lg hover:bg-zinc-800 p-2">Payments</Link>
                
                <Link className="rounded-lg hover:bg-zinc-800 p-2">Analytics</Link>
                
                <Link className="rounded-lg hover:bg-zinc-800 p-2">Officers</Link>
                
                <Link className="rounded-lg hover:bg-zinc-800 p-2">Members</Link>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-semibold ml-2">Homepage</h1>
        </header>
        <main className="overflow-auto p-4">HEllow orld</main>
      </div>
    </div>
  );
}
